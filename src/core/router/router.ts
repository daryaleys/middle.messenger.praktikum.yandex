import type Block from "../block/block";
import Route, { type RouteOptions } from "./route";

type BlockFactory = () => Block<object>;

type AuthChecker = () => boolean | Promise<boolean>;

type RouterOptions = {
	rootQuery?: string;
	authGuard?: AuthChecker;
	notFoundRoute?: string;
	loginRoute?: string;
	authorizedRoute?: string;
};

export class Router {
	private static __instance: Router | null = null;

	private routes: Route[] = [];
	private history: History = window.history;
	private _currentRoute: Route | null = null;
	private _rootQuery = "#app";
	private authChecker: AuthChecker = () => false;
	private _notFoundRoute = "/404";
	private _loginRoute = "/";
	private _authorizedRoute = "/";

	constructor({
		rootQuery = "#app",
		authGuard,
		notFoundRoute,
		loginRoute,
		authorizedRoute,
	}: RouterOptions = {}) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this._rootQuery = rootQuery;
		this._notFoundRoute = notFoundRoute ?? this._notFoundRoute;
		this._loginRoute = loginRoute ?? this._loginRoute;
		this._authorizedRoute = authorizedRoute ?? this._authorizedRoute;

		if (authGuard) {
			this.authChecker = authGuard;
		}

		Router.__instance = this;
	}

	use(pathname: string, block: BlockFactory, options: RouteOptions = {}) {
		const route = new Route(pathname, block, {
			rootQuery: this._rootQuery,
			...options,
		});

		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = () => {
			void this._onRoute(window.location.pathname);
		};

		document.addEventListener("click", (event) =>
			this.handleDocumentClick(event),
		);

		void this._onRoute(window.location.pathname);
	}

	go(pathname: string) {
		this.history.pushState({}, "", pathname);
		void this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname));
	}

	private async _onRoute(pathname: string) {
		const route =
			this.getRoute(pathname) ?? this.getRoute(this._notFoundRoute);

		if (!route) {
			return;
		}

		const redirectPath = await this.getRedirectPath(route);

		if (redirectPath) {
			this.history.replaceState({}, "", redirectPath);
			await this._onRoute(redirectPath);
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	private async getRedirectPath(route: Route) {
		if (!route.requiresAuthCheck()) {
			return null;
		}

		const isAuthorized = await this.authChecker();

		if (route.isProtected() && !isAuthorized) {
			return this._loginRoute;
		}

		if (route.isPublicOnly() && isAuthorized) {
			return this._authorizedRoute;
		}

		return null;
	}

	private handleDocumentClick(event: MouseEvent) {
		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		const link = target.closest("a");

		if (!link || link.target || link.hasAttribute("download")) {
			return;
		}

		const url = new URL(link.href);

		if (url.origin !== window.location.origin) {
			return;
		}

		event.preventDefault();
		this.go(url.pathname);
	}
}

export default Router;

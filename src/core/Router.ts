import type Block from "./Block";
import Route from "./Route";

type BlockFactory = () => Block<object>;

class Router {
	private static __instance: Router | null = null;

	private routes: Route[] = [];
	private history: History = window.history;
	private _currentRoute: Route | null = null;
	private _rootQuery = "#app";

	constructor(rootQuery = "#app") {
		if (Router.__instance) {
			return Router.__instance;
		}

		this._rootQuery = rootQuery;
		Router.__instance = this;
	}

	use(pathname: string, block: BlockFactory) {
		const route = new Route(pathname, block, {
			rootQuery: this._rootQuery,
		});

		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = () => {
			this._onRoute(window.location.pathname);
		};

		document.addEventListener("click", (event) =>
			this.handleDocumentClick(event),
		);

		this._onRoute(window.location.pathname);
	}

	go(pathname: string) {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
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

	private _onRoute(pathname: string) {
		const route = this.getRoute(pathname) ?? this.getRoute("/404");

		if (!route) {
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
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

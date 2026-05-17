import Handlebars from "handlebars";

import Block from "@src/core/Block";
import { ChatsPage } from "@src/pages/chats/ChatsPage";
import { LoginPage } from "@src/pages/login/LoginPage";
import { NotFoundPage } from "@src/pages/not-found/NotFoundPage";
import { ProfilePage } from "@src/pages/profile/ProfilePage";
import { ServerErrorPage } from "@src/pages/server-error/ServerErrorPage";
import { SigninPage } from "@src/pages/signin/SigninPage";

type RouteFactory = () => Block;

const routes: Record<string, RouteFactory> = {
	"/": () => new ChatsPage(),
	"/profile": () => new ProfilePage("view"),
	"/profile/edit": () => new ProfilePage("edit"),
	"/profile/password": () => new ProfilePage("password"),
	"/login": () => new LoginPage(),
	"/signin": () => new SigninPage(),
	"/404": () => new NotFoundPage(),
	"/500": () => new ServerErrorPage(),
};

// demo-navigation временный компонент для демонстрации работы роутера до внедрения работы с API
const appTemplate = Handlebars.compile(`
	{{> demo-navigation demoNavigationLinks}}
	<div class="app-content"></div>
`);

const demoRoutes = ["/", "/login", "/signin", "/profile", "/404", "/500"];

function getDemoNavigationLinks(pathname: string) {
	return demoRoutes.map((href) => ({
		href,
		label: href,
		isActive: pathname === href,
	}));
}

class Router {
	private root: HTMLElement | null = null;

	start(rootSelector = "#app") {
		this.root = document.querySelector<HTMLElement>(rootSelector);

		if (!this.root) {
			throw new Error(`Root element "${rootSelector}" not found`);
		}

		window.addEventListener("popstate", () => this.render());
		document.addEventListener("click", (event) =>
			this.handleDocumentClick(event),
		);

		this.render();
	}

	go(pathname: string) {
		window.history.pushState({}, "", pathname);
		this.render();
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

	private render() {
		if (!this.root) {
			return;
		}

		const pathname = window.location.pathname;
		const createPage = routes[pathname] ?? routes["/404"];
		const page = createPage();
		const pageElement = page.element();

		this.root.innerHTML = appTemplate({
			demoNavigationLinks: getDemoNavigationLinks(pathname),
		});

		const content = this.root.querySelector(".app-content");

		if (content && pageElement) {
			content.append(pageElement);
		}
	}
}

export const router = new Router();

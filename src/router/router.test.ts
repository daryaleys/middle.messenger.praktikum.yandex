import { beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_STATUS, getAuthStatus, getUser, store } from "@src/store";
import { router } from "./router";
import { ROUTES } from "./routes";
import type { UserResponse } from "@src/api";

const mocks = vi.hoisted(() => {
	function createPageClass(pageName: string) {
		return class {
			private elementInstance: HTMLElement | null = null;

			element() {
				if (this.elementInstance) {
					return this.elementInstance;
				}

				const element = document.createElement("main");
				element.dataset.page = pageName;
				this.elementInstance = element;

				return element;
			}

			destroy() {
				this.elementInstance?.remove();
				this.elementInstance = null;
			}
		};
	}

	return {
		createPageClass,
		userRequestMock: vi.fn<() => Promise<UserResponse>>(),
	};
});

const testUser: UserResponse = {
	id: 1,
	first_name: "Test",
	second_name: "User",
	display_name: "Tester",
	login: "tester",
	email: "tester@example.com",
	phone: "+79990000000",
	avatar: null,
};

vi.mock("@src/api", () => ({
	userAPI: {
		request: mocks.userRequestMock,
	},
}));
vi.mock("@src/pages/chats/ChatsPage", () => ({
	ChatsPage: mocks.createPageClass("chats"),
}));
vi.mock("@src/pages/login/LoginPage", () => ({
	LoginPage: mocks.createPageClass("login"),
}));
vi.mock("@src/pages/not-found/NotFoundPage", () => ({
	NotFoundPage: mocks.createPageClass("not-found"),
}));
vi.mock("@src/pages/profile/ProfilePage", () => ({
	ProfilePage: mocks.createPageClass("profile"),
}));
vi.mock("@src/pages/server-error/ServerErrorPage", () => ({
	ServerErrorPage: mocks.createPageClass("server-error"),
}));
vi.mock("@src/pages/signin/SigninPage", () => ({
	SigninPage: mocks.createPageClass("sign-in"),
}));

function getRenderedPage() {
	return document.querySelector("#app > main")?.getAttribute("data-page");
}

async function waitForRoute() {
	await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("router", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		store.setState({
			auth: { status: AUTH_STATUS.unchecked },
			user: { currentUser: null },
		});
		mocks.userRequestMock.mockResolvedValue(testUser);

		document.body.innerHTML = '<div id="app"></div>';
		window.history.replaceState({}, "", "/");
	});

	it("registers application routes", () => {
		expect(router.getRoute(ROUTES.login)).toBeDefined();
		expect(router.getRoute(ROUTES.signUp)).toBeDefined();
		expect(router.getRoute(ROUTES.settings)).toBeDefined();
		expect(router.getRoute(ROUTES.settingsEdit)).toBeDefined();
		expect(router.getRoute(ROUTES.settingsPassword)).toBeDefined();
		expect(router.getRoute(ROUTES.messenger)).toBeDefined();
		expect(router.getRoute(ROUTES.notFound)).toBeDefined();
		expect(router.getRoute(ROUTES.serverError)).toBeDefined();
		expect(router.getRoute("/unknown")).toBeUndefined();
	});

	it("redirects guests from protected routes to login", async () => {
		store.setState({
			auth: { status: AUTH_STATUS.guest },
		});

		router.go(ROUTES.messenger);
		await waitForRoute();

		expect(getRenderedPage()).toBe("login");
		expect(window.location.pathname).toBe(ROUTES.login);
		expect(mocks.userRequestMock).not.toHaveBeenCalled();
	});

	it("redirects authorized users from public-only routes to messenger", async () => {
		store.setState({
			auth: { status: AUTH_STATUS.authorized },
			user: { currentUser: testUser },
		});

		router.go(ROUTES.login);
		await waitForRoute();

		expect(getRenderedPage()).toBe("chats");
		expect(window.location.pathname).toBe(ROUTES.messenger);
		expect(mocks.userRequestMock).not.toHaveBeenCalled();
	});

	it("checks auth before rendering protected routes with unchecked status", async () => {
		router.go(ROUTES.messenger);
		await waitForRoute();

		expect(mocks.userRequestMock).toHaveBeenCalledOnce();
		expect(getAuthStatus()).toBe(AUTH_STATUS.authorized);
		expect(getUser()).toEqual(testUser);
		expect(getRenderedPage()).toBe("chats");
		expect(window.location.pathname).toBe(ROUTES.messenger);
	});

	it("renders not found page for unknown routes", async () => {
		router.go("/unknown");
		await waitForRoute();

		expect(getRenderedPage()).toBe("not-found");
		expect(window.location.pathname).toBe("/unknown");
		expect(router.getRoute(ROUTES.notFound)).toBeDefined();
	});
});

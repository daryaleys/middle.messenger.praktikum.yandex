import { beforeEach, describe, expect, it, vi } from "vitest";
import Router from "./router";
import type Block from "../block/block";

type RouterSingleton = {
	__instance: Router | null;
};

function createBlock(pageName: string): Block<object> {
	const element = document.createElement("main");
	element.dataset.page = pageName;

	return {
		element: () => element,
	} as unknown as Block<object>;
}

function getRenderedPage() {
	return document.querySelector("#app > main")?.getAttribute("data-page");
}

async function waitForRoute() {
	await new Promise((resolve) => setTimeout(resolve, 0));
}

describe("Router", () => {
	beforeEach(() => {
		(Router as unknown as RouterSingleton).__instance = null;
		vi.clearAllMocks();

		document.body.innerHTML = '<div id="app"></div>';
		window.history.replaceState({}, "", "/");
	});

	it("registers routes and returns the matching route", () => {
		const router = new Router();

		const result = router.use("/first", () => createBlock("first"));

		expect(result).toBe(router);
		expect(router.getRoute("/first")).toBeDefined();
		expect(router.getRoute("/unknown")).toBeUndefined();
	});

	it("renders a route and pushes the pathname to history", async () => {
		const router = new Router().use("/profile", () =>
			createBlock("profile"),
		);

		router.go("/profile");
		await waitForRoute();

		expect(getRenderedPage()).toBe("profile");
		expect(window.location.pathname).toBe("/profile");
	});

	it("renders the not found route for an unknown pathname", async () => {
		const router = new Router({ notFoundRoute: "/404" }).use(
			"/404",
			() => createBlock("not-found"),
		);

		router.go("/missing");
		await waitForRoute();

		expect(getRenderedPage()).toBe("not-found");
		expect(window.location.pathname).toBe("/missing");
	});

	it("redirects protected routes to the login route when auth guard fails", async () => {
		const authGuard = vi.fn<() => boolean>().mockReturnValue(false);
		const router = new Router({
			authGuard,
			loginRoute: "/login",
		})
			.use("/login", () => createBlock("login"))
			.use("/private", () => createBlock("private"), {
				isProtected: true,
			});

		router.go("/private");
		await waitForRoute();

		expect(authGuard).toHaveBeenCalledOnce();
		expect(getRenderedPage()).toBe("login");
		expect(window.location.pathname).toBe("/login");
	});

	it("redirects public-only routes to the authorized route when auth guard passes", async () => {
		const authGuard = vi.fn<() => Promise<boolean>>().mockResolvedValue(true);
		const router = new Router({
			authGuard,
			authorizedRoute: "/dashboard",
		})
			.use("/login", () => createBlock("login"), {
				isPublicOnly: true,
			})
			.use("/dashboard", () => createBlock("dashboard"));

		router.go("/login");
		await waitForRoute();

		expect(authGuard).toHaveBeenCalledOnce();
		expect(getRenderedPage()).toBe("dashboard");
		expect(window.location.pathname).toBe("/dashboard");
	});

	it("starts on the current pathname and handles internal link clicks", async () => {
		window.history.replaceState({}, "", "/first");

		const router = new Router()
			.use("/first", () => createBlock("first"))
			.use("/second", () => createBlock("second"));

		router.start();
		await waitForRoute();

		expect(getRenderedPage()).toBe("first");

		const link = document.createElement("a");
		link.href = "/second";
		document.body.append(link);
		link.click();
		await waitForRoute();

		expect(getRenderedPage()).toBe("second");
		expect(window.location.pathname).toBe("/second");
	});

	it("delegates back and forward navigation to history", () => {
		const router = new Router();
		const backSpy = vi
			.spyOn(window.history, "back")
			.mockImplementation(() => undefined);
		const forwardSpy = vi
			.spyOn(window.history, "forward")
			.mockImplementation(() => undefined);

		router.back();
		router.forward();

		expect(backSpy).toHaveBeenCalledOnce();
		expect(forwardSpy).toHaveBeenCalledOnce();
	});
});

import { describe, expect, it } from "vitest";
import { ProfileActions } from "./ProfileActions";

describe("ProfileActions", () => {
	it("renders provided navigation actions", () => {
		const actions = new ProfileActions({
			actions: [
				{ href: "/first", label: "First" },
				{ href: "/second", label: "Second" },
				{ href: "/", isDanger: true, label: "Logout" },
			],
		}).element();

		const links = actions?.querySelectorAll("a");
		const logoutButton = actions?.querySelector("button");

		expect(links).toHaveLength(2);
		expect(links?.[0]?.getAttribute("href")).toBe("/first");
		expect(links?.[1]?.getAttribute("href")).toBe("/second");
		expect(logoutButton).not.toBeNull();
	});

	it("disables logout action while loading", () => {
		const actions = new ProfileActions({
			actions: [{ href: "/", isDanger: true, label: "Logout" }],
			isLoading: true,
		}).element();

		const logoutButton = actions?.querySelector("button");

		expect(logoutButton?.disabled).toBe(true);
	});
});

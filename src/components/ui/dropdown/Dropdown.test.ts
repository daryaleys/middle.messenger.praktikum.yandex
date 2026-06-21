import { afterEach, describe, expect, it, vi } from "vitest";
import { Dropdown } from "./Dropdown";

function createTrigger(id: string) {
	const trigger = document.createElement("button");
	trigger.dataset.dropdownTrigger = "";
	trigger.setAttribute("aria-controls", id);
	document.body.append(trigger);

	return trigger;
}

function createDropdown(isOpen = false) {
	const dropdown = new Dropdown({
		id: "actions",
		isOpen,
		items: [
			{
				icon: "<span></span>",
				id: "archive",
				label: "Archive",
			},
		],
		triggerSelector: "[data-dropdown-trigger]",
	}).element();

	if (!dropdown) {
		throw new Error("Expected dropdown element to be created");
	}

	document.body.append(dropdown);

	return dropdown;
}

function getMenu() {
	return document.querySelector("[data-dropdown-menu]") as HTMLElement | null;
}

describe("Dropdown", () => {
	afterEach(() => {
		document.body.innerHTML = "";
		vi.restoreAllMocks();
	});

	it("renders closed by default", () => {
		const dropdown = createDropdown();

		expect(dropdown).toBeTruthy();
		expect(getMenu()?.hidden).toBe(true);
	});

	it("opens and closes by trigger click", () => {
		const trigger = createTrigger("actions");
		createDropdown();

		trigger.click();

		expect(getMenu()?.hidden).toBe(false);
		expect(trigger.getAttribute("aria-expanded")).toBe("true");

		trigger.click();

		expect(getMenu()?.hidden).toBe(true);
		expect(trigger.getAttribute("aria-expanded")).toBe("false");
	});

	it("closes by outside click", () => {
		createTrigger("actions");
		createDropdown(true);

		document.body.click();

		expect(getMenu()?.hidden).toBe(true);
	});

	it("closes by Escape", () => {
		createTrigger("actions");
		createDropdown(true);

		document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

		expect(getMenu()?.hidden).toBe(true);
	});

	it("closes when action is clicked", () => {
		const consoleSpy = vi
			.spyOn(console, "log")
			.mockImplementation(() => undefined);
		createTrigger("actions");
		const dropdown = createDropdown(true);
		const action = dropdown?.querySelector("[data-dropdown-action]");

		action?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

		expect(getMenu()?.hidden).toBe(true);
		expect(consoleSpy).toHaveBeenCalledOnce();
	});
});

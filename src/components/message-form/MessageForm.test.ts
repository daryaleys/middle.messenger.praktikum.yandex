import { beforeAll, describe, expect, it, vi } from "vitest";
import { registerComponent } from "@src/core";
import { registerHelpers } from "@src/bootstrap/registerHelpers";
import { Dropdown } from "@src/components/ui/dropdown/Dropdown";
import { Input } from "@src/components/ui/input/Input";
import { MessageForm } from "./MessageForm";

beforeAll(() => {
	registerHelpers();
	registerComponent(Dropdown);
	registerComponent(Input);
});

describe("MessageForm", () => {
	it("renders saved message value and default attachment menu", () => {
		const form = new MessageForm({
			formValues: { message: "Hello" },
		}).element();

		const input = form?.querySelector<HTMLInputElement>("input");

		expect(input?.value).toBe("Hello");
		expect(form?.querySelector("[data-dropdown-menu]")).not.toBeNull();
	});

	it("renders invalid state from message errors", () => {
		const form = new MessageForm({
			formErrors: { message: "Required" },
		}).element();

		expect(form?.getAttribute("data-validation-state")).toBe("invalid");
		expect(
			form?.querySelector("[data-validation-error]")?.hasAttribute("hidden"),
		).toBe(false);
	});

	it("calls onSubmit with typed message", () => {
		const onSubmit = vi.fn();
		const form = new MessageForm({ onSubmit }).element();
		const input = form?.querySelector<HTMLInputElement>(
			"input[name='message']",
		);

		if (input) {
			input.value = "Hello";
		}

		form?.dispatchEvent(
			new Event("submit", {
				bubbles: true,
				cancelable: true,
			}),
		);

		expect(onSubmit).toHaveBeenCalledWith("Hello");
	});
});

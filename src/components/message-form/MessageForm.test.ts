import { beforeAll, describe, expect, it } from "vitest";
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
});

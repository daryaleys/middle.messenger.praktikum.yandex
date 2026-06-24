import { beforeAll, describe, expect, it } from "vitest";
import { registerComponent } from "@src/core";
import { Input } from "@src/components/ui/input/Input";
import { FormField } from "./FormField";

beforeAll(() => {
	registerComponent(Input);
});

describe("FormField", () => {
	it("renders valid state by default", () => {
		const field = new FormField({
			label: "Login",
			name: "login",
			type: "text",
			value: "tester",
		}).element();

		const input = field?.querySelector("input") as HTMLInputElement | null;
		const error = field?.querySelector("[data-validation-error]");

		expect(field?.getAttribute("data-validation-state")).toBe("valid");
		expect(input?.value).toBe("tester");
		expect(error?.hasAttribute("hidden")).toBe(true);
	});

	it("renders invalid state from form errors", () => {
		const field = new FormField({
			formErrors: {
				login: "Required",
			},
			label: "Login",
			name: "login",
			type: "text",
		}).element();

		const error = field?.querySelector("[data-validation-error]");

		expect(field?.getAttribute("data-validation-state")).toBe("invalid");
		expect(error?.hasAttribute("hidden")).toBe(false);
	});
});

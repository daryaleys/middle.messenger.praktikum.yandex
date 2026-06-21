import { beforeAll, describe, expect, it } from "vitest";
import { registerComponent } from "@src/core";
import { Input } from "@src/components/ui/input/Input";
import { InlineFormField } from "./InlineFormField";

beforeAll(() => {
	registerComponent(Input);
});

describe("InlineFormField", () => {
	it("uses form value over initial value", () => {
		const field = new InlineFormField({
			formValues: {
				email: "form@example.com",
			},
			label: "Email",
			name: "email",
			type: "email",
			value: "initial@example.com",
		}).element();

		const input = field?.querySelector("input") as HTMLInputElement | null;
		const error = field?.querySelector("[data-validation-error]");

		expect(field?.getAttribute("data-validation-state")).toBe("valid");
		expect(input?.value).toBe("form@example.com");
		expect(error?.hasAttribute("hidden")).toBe(true);
	});

	it("renders invalid state from direct error", () => {
		const field = new InlineFormField({
			error: "Required",
			label: "Email",
			name: "email",
			type: "email",
		}).element();

		const error = field?.querySelector("[data-validation-error]");

		expect(field?.getAttribute("data-validation-state")).toBe("invalid");
		expect(error?.hasAttribute("hidden")).toBe(false);
	});
});

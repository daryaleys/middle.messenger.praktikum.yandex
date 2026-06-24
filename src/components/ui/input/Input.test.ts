import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
	it("renders text input by default", () => {
		const input = new Input({
			value: "tester",
		}).element() as HTMLInputElement;

		expect(input.value).toBe("tester");
	});

	it("renders validation and state attributes", () => {
		const input = new Input({
			disabled: true,
			isInvalid: true,
			readonly: true,
			required: true,
			type: "password",
			validationRule: "password",
		}).element() as HTMLInputElement;

		expect(input.getAttribute("data-validation-rule")).toBe("password");
		expect(input.disabled).toBe(true);
		expect(input.readOnly).toBe(true);
		expect(input.required).toBe(true);
	});
});

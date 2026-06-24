import { beforeAll, describe, expect, it } from "vitest";
import { registerComponent } from "@src/core";
import { registerHelpers } from "@src/bootstrap/registerHelpers";
import { FormField } from "@src/components/ui/form-field/FormField";
import { Input } from "@src/components/ui/input/Input";
import { SubmitButton } from "@src/components/ui/submit-button/SubmitButton";
import { AuthForm } from "./AuthForm";

beforeAll(() => {
	registerHelpers();
	registerComponent(FormField);
	registerComponent(Input);
	registerComponent(SubmitButton);
});

describe("AuthForm", () => {
	it("renders field values and disables submit while loading", () => {
		const form = new AuthForm({
			fields: [{ label: "Login", name: "login", type: "text" }],
			fieldsModifier: "",
			formValues: { login: "tester" },
			isLoading: true,
			linkHref: "/sign-up",
			linkText: "Sign up",
			submitText: "Submit",
		}).element();

		const input = form?.querySelector<HTMLInputElement>("input");
		const button = form?.querySelector<HTMLButtonElement>("button");

		expect(input?.value).toBe("tester");
		expect(button?.disabled).toBe(true);
	});
});

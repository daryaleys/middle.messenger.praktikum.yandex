import { beforeAll, describe, expect, it, vi } from "vitest";
import { registerComponent } from "@src/core";
import { registerHelpers } from "@src/bootstrap/registerHelpers";
import { Input } from "@src/components/ui/input/Input";
import { InlineFormField } from "@src/components/ui/inline-form-field/InlineFormField";
import { SubmitButton } from "@src/components/ui/submit-button/SubmitButton";
import { ProfileEditForm } from "./ProfileEditForm";
import type { ProfileEditFormController } from "./ProfileEditFormController";

beforeAll(() => {
	registerHelpers();
	registerComponent(Input);
	registerComponent(InlineFormField);
	registerComponent(SubmitButton);
});

describe("ProfileEditForm", () => {
	it("renders form values and disables submit while loading", () => {
		const form = new ProfileEditForm({
			fields: [{ label: "Email", name: "email", type: "email" }],
			formValues: { email: "tester@example.com" },
			isLoading: true,
		}).element();

		const input = form?.querySelector<HTMLInputElement>("input");
		const button = form?.querySelector<HTMLButtonElement>("button");

		expect(input?.value).toBe("tester@example.com");
		expect(button?.disabled).toBe(true);
	});

	it("submits values through controller", async () => {
		const update = vi.fn<() => Promise<undefined>>().mockResolvedValue(
			undefined,
		);
		const controller = {
			getViewModel: () => ({
				fields: [{ label: "Email", name: "email", type: "email" }],
				formErrors: {},
				formValues: {},
				isLoading: false,
				mode: "edit",
				submitError: "",
				submitText: "Save",
			}),
			update,
		} as unknown as ProfileEditFormController;
		const form = new ProfileEditForm(
			{
				fields: [{ label: "Email", name: "email", type: "email" }],
			},
			controller,
		).element() as HTMLFormElement;
		const input = form.querySelector<HTMLInputElement>("input");

		if (input) {
			input.value = "tester@example.com";
		}
		form.dispatchEvent(new SubmitEvent("submit", { bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(update).toHaveBeenCalledWith({ email: "tester@example.com" });
	});
});

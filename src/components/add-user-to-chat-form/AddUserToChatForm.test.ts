import { beforeAll, describe, expect, it, vi } from "vitest";
import { registerComponent } from "@src/core";
import { registerHelpers } from "@src/bootstrap/registerHelpers";
import { FormField } from "@src/components/ui/form-field/FormField";
import { Input } from "@src/components/ui/input/Input";
import { SubmitButton } from "@src/components/ui/submit-button/SubmitButton";
import { AddUserToChatForm } from "./AddUserToChatForm";
import type { AddUserToChatFormController } from "./AddUserToChatFormController";

beforeAll(() => {
	registerHelpers();
	registerComponent(FormField);
	registerComponent(Input);
	registerComponent(SubmitButton);
});

describe("AddUserToChatForm", () => {
	it("renders saved login and disables submit while loading", () => {
		const form = new AddUserToChatForm({
			chatId: 1,
			formValues: { login: "tester" },
			isLoading: true,
			submitText: "Add",
			title: "Add user",
		}).element();

		const input = form?.querySelector<HTMLInputElement>("input");
		const button = form?.querySelector<HTMLButtonElement>("button");

		expect(input?.value).toBe("tester");
		expect(button?.disabled).toBe(true);
	});

	it("submits login through controller and calls success callback", async () => {
		const onSuccess = vi.fn();
		const handleAddUser = vi.fn<() => Promise<undefined>>().mockResolvedValue(
			undefined,
		);
		const controller = {
			getViewModel: () => ({
				chatId: 1,
				error: null,
				isLoading: false,
				onSuccess,
				submitText: "Add",
				title: "Add user",
			}),
			handleAddUser,
		} as unknown as AddUserToChatFormController;
		const form = new AddUserToChatForm(
			{
				chatId: 1,
				onSuccess,
				submitText: "Add",
				title: "Add user",
			},
			controller,
		).element() as HTMLFormElement;
		const input = form.querySelector<HTMLInputElement>("input");

		if (input) {
			input.value = "tester";
		}
		form.dispatchEvent(new SubmitEvent("submit", { bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(handleAddUser).toHaveBeenCalledWith(1, "tester");
		expect(onSuccess).toHaveBeenCalledOnce();
	});
});

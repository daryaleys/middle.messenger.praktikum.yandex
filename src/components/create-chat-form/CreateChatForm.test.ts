import { beforeAll, describe, expect, it, vi } from "vitest";
import { registerComponent } from "@src/core";
import { registerHelpers } from "@src/bootstrap/registerHelpers";
import { FormField } from "@src/components/ui/form-field/FormField";
import { Input } from "@src/components/ui/input/Input";
import { SubmitButton } from "@src/components/ui/submit-button/SubmitButton";
import { CreateChatForm } from "./CreateChatForm";
import type { CreateChatFormController } from "./CreateChatFormController";

beforeAll(() => {
	registerHelpers();
	registerComponent(FormField);
	registerComponent(Input);
	registerComponent(SubmitButton);
});

describe("CreateChatForm", () => {
	it("renders saved form value and error state", () => {
		const form = new CreateChatForm({
			error: "Error",
			formValues: { title: "Project" },
			submitText: "Create",
			title: "Create chat",
		}).element();

		const input = form?.querySelector<HTMLInputElement>("input");

		expect(input?.value).toBe("Project");
		expect(form?.querySelector('[role="alert"]')).not.toBeNull();
	});

	it("submits title through controller and calls success callback", async () => {
		const onSuccess = vi.fn();
		const createChat = vi.fn<() => Promise<{ id: number }>>().mockResolvedValue({
			id: 10,
		});
		const controller = {
			createChat,
			getViewModel: () => ({
				error: null,
				isLoading: false,
				onSuccess,
				submitText: "Create",
				title: "Create chat",
			}),
		} as unknown as CreateChatFormController;
		const form = new CreateChatForm(
			{
				onSuccess,
				submitText: "Create",
				title: "Create chat",
			},
			controller,
		).element() as HTMLFormElement;
		const input = form.querySelector<HTMLInputElement>("input");

		if (input) {
			input.value = "Project";
		}
		form.dispatchEvent(new SubmitEvent("submit", { bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(createChat).toHaveBeenCalledWith("Project");
		expect(onSuccess).toHaveBeenCalledOnce();
	});
});

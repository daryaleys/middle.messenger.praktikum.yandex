import { beforeAll, describe, expect, it, vi } from "vitest";
import { registerComponent } from "@src/core";
import { DeleteButton } from "@src/components/ui/delete-button/DeleteButton";
import { RemoveUserFromChatForm } from "./RemoveUserFromChatForm";
import type { RemoveUserFromChatFormController } from "./RemoveUserFromChatFormController";

beforeAll(() => {
	registerComponent(DeleteButton);
});

describe("RemoveUserFromChatForm", () => {
	it("renders delete controls for users", () => {
		const form = new RemoveUserFromChatForm({
			chatId: 1,
			title: "Remove user",
			users: [
				{ id: 1, name: "One", roleLabel: "Admin" },
				{ id: 2, name: "Two", roleLabel: "Member" },
			],
		}).element();

		expect(form?.querySelectorAll("[data-delete-button-id]")).toHaveLength(2);
	});

	it("disables delete controls while loading", () => {
		const form = new RemoveUserFromChatForm({
			chatId: 1,
			isLoading: true,
			title: "Remove user",
			users: [{ id: 1, name: "One", roleLabel: "Admin" }],
		}).element();

		const button = form?.querySelector<HTMLButtonElement>("button");

		expect(button?.disabled).toBe(true);
	});

	it("removes selected user through controller and calls success callback", async () => {
		const onSuccess = vi.fn();
		const handleRemoveUserById = vi
			.fn<() => Promise<undefined>>()
			.mockResolvedValue(undefined);
		const controller = {
			getViewModel: () => ({
				chatId: 1,
				error: null,
				isLoading: false,
				isUsersLoading: false,
				onSuccess,
				title: "Remove user",
				users: [{ id: 3, name: "Three", roleLabel: "Member" }],
				usersError: null,
			}),
			handleRemoveUserById,
		} as unknown as RemoveUserFromChatFormController;
		const form = new RemoveUserFromChatForm(
			{
				chatId: 1,
				onSuccess,
				title: "Remove user",
				users: [{ id: 3, name: "Three", roleLabel: "Member" }],
			},
			controller,
		).element();
		const button = form?.querySelector("[data-delete-button-id]");

		button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(handleRemoveUserById).toHaveBeenCalledWith(1, 3);
		expect(onSuccess).toHaveBeenCalledOnce();
	});
});

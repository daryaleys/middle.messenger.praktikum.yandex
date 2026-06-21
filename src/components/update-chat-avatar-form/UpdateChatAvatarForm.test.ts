import { beforeAll, describe, expect, it, vi } from "vitest";
import { registerComponent } from "@src/core";
import { Input } from "@src/components/ui/input/Input";
import { UpdateChatAvatarForm } from "./UpdateChatAvatarForm";
import type { UpdateChatAvatarFormController } from "./UpdateChatAvatarFormController";

beforeAll(() => {
	registerComponent(Input);
});

describe("UpdateChatAvatarForm", () => {
	it("renders avatar image and generated input id", () => {
		const form = new UpdateChatAvatarForm({
			avatarUrl: "/avatar.png",
			chatId: 12,
			title: "Update avatar",
		}).element();

		const image = form?.querySelector<HTMLImageElement>("img");
		const input = form?.querySelector<HTMLInputElement>("input");

		expect(image?.getAttribute("src")).toBe("/avatar.png");
		expect(input?.getAttribute("id")).toBe("chat-avatar-12");
	});

	it("disables input while loading", () => {
		const form = new UpdateChatAvatarForm({
			chatId: 12,
			isLoading: true,
			title: "Update avatar",
		}).element();

		const input = form?.querySelector<HTMLInputElement>("input");

		expect(input?.disabled).toBe(true);
	});

	it("uploads selected file through controller and calls success callback", async () => {
		const file = new File(["avatar"], "avatar.png", { type: "image/png" });
		const onSuccess = vi.fn();
		const updateAvatar = vi.fn<() => Promise<{ id: number }>>().mockResolvedValue({
			id: 12,
		});
		const controller = {
			getViewModel: () => ({
				avatarUrl: "",
				chatId: 12,
				error: null,
				inputId: "chat-avatar-12",
				isLoading: false,
				onSuccess,
				title: "Update avatar",
			}),
			updateAvatar,
		} as unknown as UpdateChatAvatarFormController;
		const form = new UpdateChatAvatarForm(
			{
				chatId: 12,
				onSuccess,
				title: "Update avatar",
			},
			controller,
		).element();
		const input = form?.querySelector<HTMLInputElement>("input");

		Object.defineProperty(input, "files", {
			configurable: true,
			value: [file],
		});
		input?.dispatchEvent(new Event("change", { bubbles: true }));
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(updateAvatar).toHaveBeenCalledWith(12, file);
		expect(onSuccess).toHaveBeenCalledOnce();
	});
});

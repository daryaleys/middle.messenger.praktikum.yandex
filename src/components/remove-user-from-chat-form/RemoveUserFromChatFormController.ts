import { deleteChatUsersAPI } from "@src/api";
import { getChatUsers, setChatUsers } from "@src/store";

import type { RemoveUserFromChatFormProps } from "./types";

type RemoveUserFromChatFormModelLike = {
	getFormData(): RemoveUserFromChatFormProps;
};

export class RemoveUserFromChatFormController {
	private readonly model: RemoveUserFromChatFormModelLike;

	constructor(model: RemoveUserFromChatFormModelLike) {
		this.model = model;
	}

	getViewModel(): RemoveUserFromChatFormProps {
		return this.model.getFormData();
	}

	async handleRemoveUserById(chatId: number, userId: number) {
		try {
			await deleteChatUsersAPI.request({
				chatId,
				users: [userId],
			});
			setChatUsers(
				chatId,
				getChatUsers(chatId).filter((user) => user.id !== userId),
			);
		} catch {
			return "Не удалось удалить пользователя";
		}
	}
}

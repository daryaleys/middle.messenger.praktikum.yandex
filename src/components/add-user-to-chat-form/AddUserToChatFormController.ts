import {
	addChatUsersAPI,
	getChatUsersAPI,
	searchUserAPI,
} from "@src/api";
import { setChatUsers, setChatUsersLoading } from "@src/store";

import type { AddUserToChatFormProps } from "./types";

type AddUserToChatFormModelLike = {
	getFormData(): AddUserToChatFormProps;
};

export class AddUserToChatFormController {
	private readonly model: AddUserToChatFormModelLike;

	constructor(model: AddUserToChatFormModelLike) {
		this.model = model;
	}

	getViewModel(): AddUserToChatFormProps {
		return this.model.getFormData();
	}

	async handleAddUser(chatId: number, login: string) {
		try {
			const userId = await this.findUserId(login);

			await addChatUsersAPI.request({
				chatId,
				users: [userId],
			});
			await this.refreshChatUsers(chatId);
		} catch {
			return "Не удалось добавить пользователя";
		}
	}

	private async findUserId(login: string) {
		const users = await searchUserAPI.request({ login });
		const user = users.find((item) => item.login === login);

		if (!user) {
			throw new Error("Пользователь не найден");
		}

		return user.id;
	}

	private async refreshChatUsers(chatId: number) {
		setChatUsersLoading(chatId, true);
		const users = await getChatUsersAPI.request({ id: chatId });
		setChatUsers(chatId, users);
	}
}

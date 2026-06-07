import {
	addChatUsersAPI,
	deleteChatUsersAPI,
	getChatUsersAPI,
	searchUserAPI,
} from "@src/api";
import { setChatUsers, setChatUsersLoading } from "@src/store";

import { ChatUserFormModel } from "./ChatUserFormModel";
import {
	CHAT_USER_FORM_ACTIONS,
	type ChatUserFormAction,
	type ChatUserFormProps,
} from "./types";

export class ChatUserFormController {
	private readonly model: ChatUserFormModel;

	constructor(model: ChatUserFormModel) {
		this.model = model;
	}

	getViewModel(): ChatUserFormProps {
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
			return this.getSubmitError(CHAT_USER_FORM_ACTIONS.addUser);
		}
	}

	async handleRemoveUser(chatId: number, login: string) {
		try {
			const userId = await this.findChatUserId(chatId, login);

			await deleteChatUsersAPI.request({
				chatId,
				users: [userId],
			});
			await this.refreshChatUsers(chatId);
		} catch {
			return this.getSubmitError(CHAT_USER_FORM_ACTIONS.removeUser);
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

	private async findChatUserId(chatId: number, login: string) {
		const users = await getChatUsersAPI.request({
			id: chatId,
			limit: 1000,
		});
		const user = users.find((item) => item.login === login);

		if (!user) {
			throw new Error("Пользователь не найден в этом чате");
		}

		return user.id;
	}

	private async refreshChatUsers(chatId: number) {
		setChatUsersLoading(chatId, true);
		const users = await getChatUsersAPI.request({ id: chatId });
		setChatUsers(chatId, users);
	}

	private getSubmitError(action: ChatUserFormAction) {
		return action === CHAT_USER_FORM_ACTIONS.addUser
			? "Не удалось добавить пользователя"
			: "Не удалось удалить пользователя";
	}
}

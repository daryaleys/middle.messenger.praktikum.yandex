import { API_BASE_URL, chatAvatarAPI, type Chat as APIChat } from "@src/api";
import type { Chat } from "@src/components/layout/SidebarLayout/types";
import { updateChat } from "@src/store";
import { sanitizeResourceUrl } from "@src/utils/security";

import type { UpdateChatAvatarFormProps } from "./types";

type UpdateChatAvatarFormModelLike = {
	getFormData(): Required<UpdateChatAvatarFormProps>;
};

export class UpdateChatAvatarFormController {
	private readonly model: UpdateChatAvatarFormModelLike;

	constructor(model: UpdateChatAvatarFormModelLike) {
		this.model = model;
	}

	getViewModel(): Required<UpdateChatAvatarFormProps> {
		return this.model.getFormData();
	}

	async updateAvatar(chatId: number, avatar: File) {
		try {
			const chat = await chatAvatarAPI.request({ chatId, avatar });
			updateChat(this.mapChatToView(chat));
			return chat;
		} catch {
			return "Не удалось обновить аватар чата. Попробуйте другой файл.";
		}
	}

	private mapChatToView(chat: APIChat): Chat {
		return {
			id: chat.id,
			title: chat.title,
			avatarUrl: this.getAvatarUrl(chat.avatar),
			unreadCount: chat.unread_count,
			lastMessage: chat.last_message
				? {
						author: chat.last_message.user.login,
						text: chat.last_message.content,
						time: this.formatMessageTime(chat.last_message.time),
					}
				: undefined,
		};
	}

	private getAvatarUrl(avatar?: string | null) {
		return sanitizeResourceUrl(avatar, API_BASE_URL);
	}

	private formatMessageTime(value: string) {
		const date = new Date(value);

		if (Number.isNaN(date.getTime())) {
			return "";
		}

		return new Intl.DateTimeFormat("ru-RU", {
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	}
}

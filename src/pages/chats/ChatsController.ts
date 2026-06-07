import { getChatsAPI, type Chat as APIChat } from "@src/api";
import type { Chat } from "@src/components/layout/SidebarLayout/types";
import {
	setChats,
	setChatsError,
	setChatsLoading,
} from "@src/store";

import { ChatsModel } from "./ChatsModel";

export class ChatsController {
	private readonly model: ChatsModel;

	constructor(model = new ChatsModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}

	async loadChats() {
		setChatsLoading(true);

		try {
			const chats = await getChatsAPI.request();
			const mappedChats = chats.map((chat) => this.mapChatToView(chat));

			setChats(mappedChats);
			return mappedChats;
		} catch {
			const message = "Не удалось загрузить список чатов";

			setChatsError(message);
			return [];
		}
	}

	private mapChatToView(chat: APIChat): Chat {
		return {
			id: chat.id,
			title: chat.title,
			avatarUrl: chat.avatar ?? "",
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

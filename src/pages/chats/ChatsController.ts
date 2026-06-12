import {
	API_BASE_URL,
	getChatsAPI,
	getChatUsersAPI,
	type Chat as APIChat,
} from "@src/api";
import type { Chat } from "@src/components/layout/SidebarLayout/types";
import {
	setChatUsers,
	setChatUsersError,
	setChatUsersLoading,
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

	async loadChatUsers(chatId: number) {
		setChatUsersLoading(chatId, true);

		try {
			const users = await getChatUsersAPI.request({ id: chatId });

			setChatUsers(chatId, users);
		} catch {
			setChatUsersError(chatId, "Не удалось загрузить участников");
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

	private getAvatarUrl(avatar?: string | null) {
		if (!avatar) {
			return "";
		}

		return avatar.startsWith("/")
			? `${API_BASE_URL}/resources${avatar}`
			: avatar;
	}
}

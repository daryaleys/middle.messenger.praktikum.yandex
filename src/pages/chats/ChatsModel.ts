import {
	getChatsForView,
	getChatsError,
	getSelectedChat,
	isChatsLoading,
} from "@src/store";
import type { ChatsPageProps } from "./types";

export class ChatsModel {
	getPageData(): ChatsPageProps {
		const chats = getChatsForView();
		const error = getChatsError();

		return {
			activeChat: this.getActiveChat(),
			chats,
			error,
			isLoading: !error && (chats.length === 0 ? true : isChatsLoading()),
		};
	}

	private getActiveChat(): ChatsPageProps["activeChat"] {
		const selectedChat = getSelectedChat();

		if (!selectedChat) {
			return null;
		}

		return {
			title: selectedChat.title,
			date: "",
			messages: [],
		};
	}
}

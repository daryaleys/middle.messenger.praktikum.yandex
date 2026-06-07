import type { Chat } from "@src/components/layout/SidebarLayout/types";

import { store } from "../store";

type ChatsState = {
	chats?: Chat[];
	error?: string | null;
	isLoading?: boolean;
	selectedChatId?: number | null;
};

function getChatsState(): ChatsState {
	return (store.getState().chats as ChatsState | undefined) ?? {};
}

export function getChats(): Chat[] {
	return getChatsState().chats ?? [];
}

export function getChatsForView(): Chat[] {
	const selectedChatId = getSelectedChatId();

	return getChats().map((chat) => ({
		...chat,
		isActive: chat.id === selectedChatId,
	}));
}

export function getSelectedChatId(): number | null {
	return getChatsState().selectedChatId ?? null;
}

export function getSelectedChat(): Chat | null {
	const selectedChatId = getSelectedChatId();

	return getChats().find((chat) => chat.id === selectedChatId) ?? null;
}

export function isChatsLoading(): boolean {
	return Boolean(getChatsState().isLoading);
}

export function getChatsError(): string | null {
	return getChatsState().error ?? null;
}

export function setChats(chats: Chat[]) {
	store.setState({
		chats: {
			chats,
			error: null,
			isLoading: false,
		},
	});
}

export function setChatsLoading(isLoading: boolean) {
	store.setState({
		chats: {
			isLoading,
		},
	});
}

export function setChatsError(error: string | null) {
	store.setState({
		chats: {
			error,
			isLoading: false,
		},
	});
}

export function selectChat(chatId: number | null) {
	store.setState({
		chats: {
			selectedChatId: chatId,
		},
	});
}

export function addChat(chat: Chat) {
	setChats([chat, ...getChats()]);
}

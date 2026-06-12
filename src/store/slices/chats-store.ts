import type { Chat } from "@src/components/layout/SidebarLayout/types";
import type { ChatUser } from "@src/api";

import { store } from "../store";

type ChatsState = {
	chatUsers?: Record<number, ChatUser[]>;
	chatUsersError?: Record<number, string | null>;
	chatUsersLoading?: Record<number, boolean>;
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

export function getChatUsers(chatId: number): ChatUser[] {
	return getChatsState().chatUsers?.[chatId] ?? [];
}

export function getChatUsersError(chatId: number): string | null {
	return getChatsState().chatUsersError?.[chatId] ?? null;
}

export function isChatUsersLoading(chatId: number): boolean {
	return Boolean(getChatsState().chatUsersLoading?.[chatId]);
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

export function setChatUsers(chatId: number, users: ChatUser[]) {
	const state = getChatsState();

	store.setState({
		chats: {
			chatUsers: {
				...(state.chatUsers ?? {}),
				[chatId]: users,
			},
			chatUsersError: {
				...(state.chatUsersError ?? {}),
				[chatId]: null,
			},
			chatUsersLoading: {
				...(state.chatUsersLoading ?? {}),
				[chatId]: false,
			},
		},
	});
}

export function setChatUsersError(chatId: number, error: string | null) {
	const state = getChatsState();

	store.setState({
		chats: {
			chatUsersError: {
				...(state.chatUsersError ?? {}),
				[chatId]: error,
			},
			chatUsersLoading: {
				...(state.chatUsersLoading ?? {}),
				[chatId]: false,
			},
		},
	});
}

export function setChatUsersLoading(chatId: number, isLoading: boolean) {
	const state = getChatsState();

	store.setState({
		chats: {
			chatUsersError: {
				...(state.chatUsersError ?? {}),
				[chatId]: null,
			},
			chatUsersLoading: {
				...(state.chatUsersLoading ?? {}),
				[chatId]: isLoading,
			},
		},
	});
}

export function addChat(chat: Chat) {
	setChats([chat, ...getChats()]);
}

export function updateChat(chat: Chat) {
	setChats(
		getChats().map((item) =>
			item.id === chat.id
				? {
						...item,
						...chat,
					}
				: item,
		),
	);
}

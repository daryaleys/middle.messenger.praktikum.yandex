import {
	getChatUsers,
	getChatUsersError,
	getSelectedChat,
	isChatUsersLoading,
} from "@src/store";
import type { ChatUser } from "@src/api";

import type { ChatsPageProps } from "./types";

function getUserDisplayName(user: ChatUser) {
	const fullName = `${user.first_name} ${user.second_name}`.trim();

	return user.display_name || fullName || user.login;
}

function getUserRoleLabel(user: ChatUser) {
	return user.role === "admin" ? "Администратор" : "Участник";
}

export function mapActiveChatToView(): ChatsPageProps["activeChat"] {
	const selectedChat = getSelectedChat();

	if (!selectedChat) {
		return null;
	}

	const users = getChatUsers(selectedChat.id);

	return {
		id: selectedChat.id,
		title: selectedChat.title,
		avatarUrl: selectedChat.avatarUrl,
		date: "",
		usersError: getChatUsersError(selectedChat.id),
		isUsersLoading: isChatUsersLoading(selectedChat.id),
		messages: [],
		users: users.map((user) => ({
			id: user.id,
			name: getUserDisplayName(user),
			role: user.role,
			roleLabel: getUserRoleLabel(user),
		})),
	};
}

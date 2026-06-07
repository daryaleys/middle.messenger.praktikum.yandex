import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";
import type {
	ChatUser,
	ChatUsersRequest,
	GetChatUsersRequest,
} from "./types";

const chatUsersAPIInstance = new HTTPTransport(`${API_BASE_URL}/chats`);

export class ChatUsersAPI {
	/** Получает пользователей чата с опциональной пагинацией и фильтрами. */
	getChatUsers(id: number, data: GetChatUsersRequest = {}) {
		return chatUsersAPIInstance.get<ChatUser[]>(`/${id}/users`, { data });
	}

	/** Добавляет пользователей в чат. */
	addUsers(data: ChatUsersRequest) {
		return chatUsersAPIInstance.put<void>("/users", { data });
	}

	/** Удаляет пользователей из чата. */
	deleteUsers(data: ChatUsersRequest) {
		return chatUsersAPIInstance.delete<void>("/users", { data });
	}
}

export const chatUsersAPI = new ChatUsersAPI();

export { chatUsersAPIInstance };
export type { ChatUser, ChatUsersRequest, GetChatUsersRequest };

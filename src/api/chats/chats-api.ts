import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";
import type {
	Chat,
	CreateChatRequest,
	CreateChatResponse,
	DeleteChatRequest,
	DeleteChatResponse,
	GetChatsRequest,
} from "./types";

const chatsAPIInstance = new HTTPTransport(`${API_BASE_URL}/chats`);

export class ChatsAPI {
	/** Получает список чатов с опциональной пагинацией и фильтром по названию. */
	getChats(data: GetChatsRequest = {}) {
		return chatsAPIInstance.get<Chat[]>("", { data });
	}

	/** Создает новый чат и возвращает его id. */
	createChat(data: CreateChatRequest) {
		return chatsAPIInstance.post<CreateChatResponse>("", { data });
	}

	/** Удаляет чат по id, если у пользователя есть права администратора. */
	deleteChat(data: DeleteChatRequest) {
		return chatsAPIInstance.delete<DeleteChatResponse>("", { data });
	}

	/** Получает общие чаты с пользователем из текущего диалога. */
	getCommonChat(id: number) {
		return chatsAPIInstance.get<Chat[]>(`/${id}/common`);
	}
}

export const chatsAPI = new ChatsAPI();

export { chatsAPIInstance };
export type {
	Chat,
	CreateChatRequest,
	CreateChatResponse,
	DeleteChatRequest,
	DeleteChatResponse,
	GetChatsRequest,
};

import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";
import type {
	ChatTokenResponse,
	NewMessagesCountResponse,
} from "./types";

const chatMessagesAPIInstance = new HTTPTransport(`${API_BASE_URL}/chats`);

export class ChatMessagesAPI {
	/** Получает количество новых сообщений в чате. */
	getNewMessagesCount(id: number) {
		return chatMessagesAPIInstance.get<NewMessagesCountResponse>(
			`/new/${id}`,
		);
	}

	/** Запрашивает токен для подключения к серверу сообщений чата. */
	getToken(id: number) {
		return chatMessagesAPIInstance.post<ChatTokenResponse[]>(
			`/token/${id}`,
		);
	}
}

export const chatMessagesAPI = new ChatMessagesAPI();

export { chatMessagesAPIInstance };
export type { ChatTokenResponse, NewMessagesCountResponse };

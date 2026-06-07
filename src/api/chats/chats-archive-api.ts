import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";
import type {
	ArchiveChatRequest,
	ArchiveChatResponse,
	Chat,
	GetChatsRequest,
	UnarchiveChatRequest,
	UnarchiveChatResponse,
} from "./types";

const chatsArchiveAPIInstance = new HTTPTransport(
	`${API_BASE_URL}/chats`,
);

export class ChatsArchiveAPI {
	/** Получает архивные чаты с опциональной пагинацией и фильтром по названию. */
	getArchivedChats(data: GetChatsRequest = {}) {
		return chatsArchiveAPIInstance.get<Chat[]>("/archive", { data });
	}

	/** Переносит чат в архив. */
	archiveChat(data: ArchiveChatRequest) {
		return chatsArchiveAPIInstance.post<ArchiveChatResponse>("/archive", {
			data,
		});
	}

	/** Возвращает чат из архива. */
	unarchiveChat(data: UnarchiveChatRequest) {
		return chatsArchiveAPIInstance.post<UnarchiveChatResponse>(
			"/unarchive",
			{ data },
		);
	}
}

export const chatsArchiveAPI = new ChatsArchiveAPI();

export { chatsArchiveAPIInstance };
export type {
	ArchiveChatRequest,
	ArchiveChatResponse,
	UnarchiveChatRequest,
	UnarchiveChatResponse,
};

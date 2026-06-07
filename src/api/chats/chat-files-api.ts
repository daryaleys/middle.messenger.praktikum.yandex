import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";
import type {
	Chat,
	ChatFile,
	ChatFileMessage,
	UploadChatAvatarRequest,
} from "./types";

const chatFilesAPIInstance = new HTTPTransport(`${API_BASE_URL}/chats`);

export class ChatFilesAPI {
	/** Получает отправленные в чат файлы. */
	getChatFiles(id: number) {
		return chatFilesAPIInstance.get<ChatFileMessage[]>(`/${id}/files`);
	}

	/** Загружает или обновляет аватар чата. */
	uploadAvatar(data: UploadChatAvatarRequest) {
		const formData = new FormData();

		formData.append("chatId", data.chatId.toString());
		formData.append("avatar", data.avatar);

		return chatFilesAPIInstance.put<Chat>("/avatar", { data: formData });
	}
}

export const chatFilesAPI = new ChatFilesAPI();

export { chatFilesAPIInstance };
export type { ChatFile, ChatFileMessage, UploadChatAvatarRequest };

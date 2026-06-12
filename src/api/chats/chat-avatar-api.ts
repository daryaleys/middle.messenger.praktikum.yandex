import { BaseAPI } from "@src/core";

import type { Chat } from "./get-chats-api";
import { chatsAPIInstance } from "./chats-instance";

type ChatAvatarRequest = {
	chatId: number;
	avatar: File;
};

export class ChatAvatarAPI extends BaseAPI {
	request(data: ChatAvatarRequest): Promise<Chat> {
		const formData = new FormData();
		formData.append("chatId", String(data.chatId));
		formData.append("avatar", data.avatar);

		return chatsAPIInstance.put("/avatar", {
			data: formData,
		});
	}
}

export const chatAvatarAPI = new ChatAvatarAPI();

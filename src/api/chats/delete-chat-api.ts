import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

export type DeleteChatRequest = {
	chatId: number;
};

export type DeleteChatResponse = {
	userId: number;
	result: {
		id: number;
		title: string;
		avatar: string | null;
		created_by: number;
	};
};

export class DeleteChatAPI extends BaseAPI {
	request(data: DeleteChatRequest): Promise<DeleteChatResponse> {
		return chatsAPIInstance.delete("", { data });
	}
}

export const deleteChatAPI = new DeleteChatAPI();

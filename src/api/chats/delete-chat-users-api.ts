import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

export type DeleteChatUsersRequest = {
	users: number[];
	chatId: number;
};

export class DeleteChatUsersAPI extends BaseAPI {
	request(data: DeleteChatUsersRequest): Promise<void> {
		return chatsAPIInstance.delete("/users", { data });
	}
}

export const deleteChatUsersAPI = new DeleteChatUsersAPI();

import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

export type AddChatUsersRequest = {
	users: number[];
	chatId: number;
};

export class AddChatUsersAPI extends BaseAPI {
	request(data: AddChatUsersRequest) {
		return chatsAPIInstance.put<void>("/users", { data });
	}
}

export const addChatUsersAPI = new AddChatUsersAPI();

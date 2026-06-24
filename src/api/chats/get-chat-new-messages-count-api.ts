import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

export type GetChatNewMessagesCountRequest = {
	id: number;
};

export type GetChatNewMessagesCountResponse = {
	unread_count: number;
};

export class GetChatNewMessagesCountAPI extends BaseAPI {
	request({
		id,
	}: GetChatNewMessagesCountRequest): Promise<GetChatNewMessagesCountResponse> {
		return chatsAPIInstance.get(`/new/${id}`);
	}
}

export const getChatNewMessagesCountAPI =
	new GetChatNewMessagesCountAPI();

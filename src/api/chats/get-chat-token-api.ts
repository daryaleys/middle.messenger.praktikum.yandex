import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

export type GetChatTokenRequest = {
	id: number;
};

export type GetChatTokenResponse = {
	token: string;
};

export class GetChatTokenAPI extends BaseAPI {
	request({ id }: GetChatTokenRequest): Promise<GetChatTokenResponse> {
		return chatsAPIInstance.post(`/token/${id}`);
	}
}

export const getChatTokenAPI = new GetChatTokenAPI();

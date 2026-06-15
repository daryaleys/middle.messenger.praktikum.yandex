import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

export type CreateChatRequest = {
	title: string;
};

export type CreateChatResponse = {
	id: number;
};

export class CreateChatAPI extends BaseAPI {
	request(data: CreateChatRequest): Promise<CreateChatResponse> {
		return chatsAPIInstance.post("", { data });
	}
}

export const createChatAPI = new CreateChatAPI();

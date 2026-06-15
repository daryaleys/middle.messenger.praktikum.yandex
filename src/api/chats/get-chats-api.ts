import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

type LastMessageUser = {
	first_name: string;
	second_name: string;
	avatar: string | null;
	email: string;
	login: string;
	phone: string;
};

type LastMessage = {
	user: LastMessageUser;
	time: string;
	content: string;
};

export type Chat = {
	id: number;
	title: string;
	avatar: string | null;
	unread_count: number;
	created_by: number;
	last_message: LastMessage | null;
};

export type GetChatsRequest = {
	offset?: number;
	limit?: number;
	title?: string;
};

export class GetChatsAPI extends BaseAPI {
	request(data: GetChatsRequest = {}): Promise<Chat[]> {
		return chatsAPIInstance.get("", { data });
	}
}

export const getChatsAPI = new GetChatsAPI();

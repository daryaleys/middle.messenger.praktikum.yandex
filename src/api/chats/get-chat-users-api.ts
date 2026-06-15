import { BaseAPI } from "@src/core";

import { chatsAPIInstance } from "./chats-instance";

export type ChatUser = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string | null;
	login: string;
	avatar: string | null;
	role: "admin" | "regular";
};

export type GetChatUsersRequest = {
	id: number;
	offset?: number;
	limit?: number;
	name?: string;
	email?: string;
};

export class GetChatUsersAPI extends BaseAPI {
	request({ id, ...data }: GetChatUsersRequest): Promise<ChatUser[]> {
		return chatsAPIInstance.get(`/${id}/users`, { data });
	}
}

export const getChatUsersAPI = new GetChatUsersAPI();

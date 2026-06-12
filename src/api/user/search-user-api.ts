import { BaseAPI } from "@src/core";

import { userAPIInstance } from "./user-instance";

export type SearchUserRequest = {
	login: string;
};

export type SearchUserResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string | null;
	login: string;
	avatar: string | null;
	email: string;
	phone: string;
};

export class SearchUserAPI extends BaseAPI {
	request(data: SearchUserRequest): Promise<SearchUserResponse[]> {
		return userAPIInstance.post("/search", {
			data,
		});
	}
}

export const searchUserAPI = new SearchUserAPI();

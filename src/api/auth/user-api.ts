import { BaseAPI } from "@src/core";

import { authAPIInstance } from "./auth-instance";

type UserResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string | null;
	login: string;
	email: string;
	phone: string;
	avatar: string | null;
};

export class UserAPI extends BaseAPI {
	request() {
		return authAPIInstance.get<UserResponse>("/user");
	}
}

export const userAPI = new UserAPI();

import { BaseAPI } from "@src/core";

import { userAPIInstance } from "./user-instance";

type ProfileRequest = {
	first_name?: string;
	second_name?: string;
	display_name?: string;
	login?: string;
	email?: string;
	phone?: string;
};

type ProfileResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
};

export class ProfileAPI extends BaseAPI {
	request(user: ProfileRequest) {
		return userAPIInstance.put<ProfileResponse>("/profile", { data: user });
	}
}

export const profileAPI = new ProfileAPI();

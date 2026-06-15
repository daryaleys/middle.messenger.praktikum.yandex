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
	request(user: ProfileRequest): Promise<ProfileResponse> {
		return userAPIInstance.put("/profile", { data: user });
	}
}

export const profileAPI = new ProfileAPI();

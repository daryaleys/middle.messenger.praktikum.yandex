import { BaseAPI } from "@src/core";

import { userAPIInstance } from "./user-instance";

type ProfileAvatarRequest = {
	avatar: File;
};

type ProfileAvatarResponse = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
};

export class ProfileAvatarAPI extends BaseAPI {
	request(user: ProfileAvatarRequest) {
		const formData = new FormData();
		formData.append("avatar", user.avatar);

		return userAPIInstance.put<ProfileAvatarResponse>("/profile/avatar", {
			data: formData,
		});
	}
}

export const profileAvatarAPI = new ProfileAvatarAPI();

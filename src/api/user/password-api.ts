import { BaseAPI } from "@src/core";

import { userAPIInstance } from "./user-instance";

type PasswordRequest = {
	oldPassword: string;
	newPassword: string;
};

export class PasswordAPI extends BaseAPI {
	request(password: PasswordRequest): Promise<void> {
		return userAPIInstance.put("/password", { data: password });
	}
}

export const passwordAPI = new PasswordAPI();

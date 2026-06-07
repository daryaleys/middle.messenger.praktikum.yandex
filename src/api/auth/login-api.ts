import { BaseAPI } from "@src/core";

import { authAPIInstance } from "./auth-instance";

type SigninRequest = {
	login: string;
	password: string;
};

export class LoginAPI extends BaseAPI {
	request(user: SigninRequest) {
		return authAPIInstance.post<void>("/signin", { data: user });
	}
}

export const loginAPI = new LoginAPI();

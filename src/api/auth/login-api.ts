import { BaseAPI } from "@src/core";

import { authAPIInstance } from "./auth-instance";

type SigninRequest = {
	login: string;
	password: string;
};

export class LoginAPI extends BaseAPI {
	request(user: SigninRequest): Promise<void> {
		return authAPIInstance.post("/signin", { data: user });
	}
}

export const loginAPI = new LoginAPI();

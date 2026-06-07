import { BaseAPI } from "@src/core";

import { authAPIInstance } from "./auth-instance";

type SignupRequest = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

type SignupResponse = {
	id: number;
};

export class SignupAPI extends BaseAPI {
	request(user: SignupRequest) {
		return authAPIInstance
			.post<SignupResponse>("/signup", { data: user })
			.then(({ id }) => id);
	}
}

export const signupAPI = new SignupAPI();

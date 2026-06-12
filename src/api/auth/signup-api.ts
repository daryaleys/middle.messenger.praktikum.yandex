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
	async request(user: SignupRequest): Promise<number> {
		const response: SignupResponse = await authAPIInstance.post("/signup", {
			data: user,
		});

		return response.id;
	}
}

export const signupAPI = new SignupAPI();

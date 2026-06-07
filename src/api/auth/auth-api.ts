import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";

const authAPIInstance = new HTTPTransport(`${API_BASE_URL}/auth`);

type SignupRequest = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

type SigninRequest = {
	login: string;
	password: string;
};

type SignupResponse = {
	id: number;
};

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

export class AuthAPI {
	/** Регистрирует нового пользователя. */
	signup(data: SignupRequest) {
		return authAPIInstance.post<SignupResponse>("/signup", { data });
	}

	/** Авторизует пользователя по логину и паролю. */
	signin(data: SigninRequest) {
		return authAPIInstance.post<void>("/signin", { data });
	}

	/** Получает данные текущего авторизованного пользователя. */
	getUser() {
		return authAPIInstance.get<UserResponse>("/user");
	}

	/** Завершает текущую пользовательскую сессию. */
	logout() {
		return authAPIInstance.post<void>("/logout");
	}
}

export const authAPI = new AuthAPI();

export {
	authAPIInstance,
	type SigninRequest,
	type SignupRequest,
	type SignupResponse,
	type UserResponse,
};

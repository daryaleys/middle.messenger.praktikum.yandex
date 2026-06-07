import { loginAPI } from "@src/api/auth/login-api";
import { setAuthorized } from "@src/store";
import { userAPI } from "@src/api/auth/user-api";
import { router } from "@src/router/router";
import { ROUTES } from "@src/router/routes";
import type { FormValues } from "@src/utils/validation";

import { LoginModel } from "./LoginModel";

type LoginControllerOptions = {
	model?: LoginModel;
};

export class LoginController {
	private readonly model: LoginModel;

	constructor({ model = new LoginModel() }: LoginControllerOptions = {}) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}

	async login(values: FormValues) {
		try {
			await loginAPI.request({
				login: values.login,
				password: values.password,
			});
			await userAPI.request();
			setAuthorized();
			router.go(ROUTES.messenger);
		} catch (error) {
			return "Не удалось войти. Проверьте логин и пароль.";
		}
	}
}

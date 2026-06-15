import { loginAPI, userAPI } from "@src/api";
import { setAuthorized, setUser } from "@src/store";
import { ROUTES, router } from "@src/router";
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
			const user = await userAPI.request();
			setAuthorized();
			setUser(user);
			router.go(ROUTES.messenger);
		} catch {
			return "Не удалось войти. Проверьте логин и пароль.";
		}
	}
}

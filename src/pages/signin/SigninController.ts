import { setAuthorized, setUser } from "@src/store";
import { signupAPI } from "@src/api/auth/signup-api";
import { userAPI } from "@src/api/auth/user-api";
import { router } from "@src/router/router";
import { ROUTES } from "@src/router/routes";
import type { FormValues } from "@src/utils/validation";

import { SigninModel } from "./SigninModel";

export class SigninController {
	private readonly model: SigninModel;

	constructor(model = new SigninModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}

	async signup(values: FormValues) {
		try {
			await signupAPI.request({
				first_name: values.first_name,
				second_name: values.second_name,
				login: values.login,
				email: values.email,
				password: values.password,
				phone: values.phone,
			});
			const user = await userAPI.request();
			setAuthorized();
			setUser(user);
			router.go(ROUTES.messenger);
		} catch {
			return "Не удалось зарегистрироваться. Проверьте данные формы.";
		}
	}
}

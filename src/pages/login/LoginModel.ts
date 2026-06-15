import { ROUTES } from "@src/router";
import type { LoginPageProps } from "./types";

export class LoginModel {
	getPageData(): LoginPageProps {
		return {
			loginPageData: {
				cardModifier: "",
				fieldsModifier: "auth-form__fields--login",
				linkHref: ROUTES.signUp,
				linkText: "Нет аккаунта?",
				submitText: "Авторизоваться",
				title: "Вход",
				titleId: "login-title",
				fields: [
					{
						label: "Логин",
						name: "login",
						type: "text",
					},
					{
						label: "Пароль",
						name: "password",
						type: "password",
					},
				],
			},
		};
	}
}

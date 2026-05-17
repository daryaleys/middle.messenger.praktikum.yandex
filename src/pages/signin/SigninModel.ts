import type { SigninPageProps } from "./types";

export class SigninModel {
	getPageData(): SigninPageProps {
		return {
			signInPageData: {
				cardModifier: "auth-card--signup",
				fieldsModifier: "",
				linkHref: "/login",
				linkText: "Войти",
				submitText: "Зарегистрироваться",
				title: "Регистрация",
				titleId: "signin-title",
				fields: [
					{
						label: "Имя",
						name: "first_name",
						type: "text",
					},
					{
						label: "Фамилия",
						name: "second_name",
						type: "text",
					},
					{
						label: "Логин",
						name: "login",
						type: "text",
					},
					{
						label: "Почта",
						name: "email",
						type: "email",
					},
					{
						label: "Пароль",
						name: "password",
						type: "password",
					},
					{
						label: "Телефон",
						name: "phone",
						type: "tel",
					},
				],
			},
		};
	}
}

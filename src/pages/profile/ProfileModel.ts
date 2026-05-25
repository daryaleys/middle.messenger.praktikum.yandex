import type { ProfileData } from "./types";

export class ProfileModel {
	getProfileData(): ProfileData {
		return {
			firstName: "Иван",
			mainFields: [
				{
					label: "Почта",
					name: "email",
					type: "email",
					value: "ivanivanov@mail.ru",
				},
				{
					label: "Логин",
					name: "login",
					type: "text",
					value: "ivanivanov",
				},
				{
					label: "Имя",
					name: "first_name",
					type: "text",
					value: "Иван",
				},
				{
					label: "Фамилия",
					name: "second_name",
					type: "text",
					value: "Иванов",
				},
				{
					label: "Имя в чате",
					name: "display_name",
					type: "text",
					value: "Иван",
				},
				{
					label: "Телефон",
					name: "phone",
					type: "tel",
					value: "+79099673030",
				},
			],
			passwordFields: [
				{
					label: "Старый пароль",
					name: "old_password",
					type: "password",
					validationRule: "password",
				},
				{
					label: "Новый пароль",
					name: "new_password",
					type: "password",
					validationRule: "password",
				},
				{
					label: "Повторите новый пароль",
					name: "new_password_repeat",
					type: "password",
					validationRule: "password_repeat",
				},
			],
		};
	}
}

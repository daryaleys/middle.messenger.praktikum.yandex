import { API_BASE_URL } from "@src/api";

import type { ProfileData } from "./types";

type ProfileUser = {
	first_name: string;
	second_name: string;
	display_name: string | null;
	login: string;
	email: string;
	phone: string;
	avatar: string | null;
};

export class ProfileModel {
	private readonly user: ProfileUser | null;

	constructor(user: ProfileUser | null = null) {
		this.user = user;
	}

	getProfileData(): ProfileData {
		const user = this.user;

		return {
			avatar: this.getAvatarUrl(user?.avatar),
			firstName: user?.first_name ?? "",
			mainFields: [
				{
					label: "Почта",
					name: "email",
					type: "email",
					value: user?.email ?? "",
					validationRule: "email",
				},
				{
					label: "Логин",
					name: "login",
					type: "text",
					value: user?.login ?? "",
					validationRule: "login",
				},
				{
					label: "Имя",
					name: "first_name",
					type: "text",
					value: user?.first_name ?? "",
					validationRule: "first_name",
				},
				{
					label: "Фамилия",
					name: "second_name",
					type: "text",
					value: user?.second_name ?? "",
					validationRule: "second_name",
				},
				{
					label: "Имя в чате",
					name: "display_name",
					type: "text",
					value: user?.display_name ?? "",
				},
				{
					label: "Телефон",
					name: "phone",
					type: "tel",
					value: user?.phone ?? "",
					validationRule: "phone",
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

	private getAvatarUrl(avatar?: string | null) {
		if (!avatar) {
			return "";
		}

		return avatar.startsWith("/")
			? `${API_BASE_URL}/resources${avatar}`
			: avatar;
	}
}

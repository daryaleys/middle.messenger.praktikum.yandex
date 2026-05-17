import type { ValidationRule, ValidationRuleName } from "./types";

export const validationRules: Record<ValidationRuleName, ValidationRule> = {
	first_name: {
		pattern: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
		message:
			"Имя должно начинаться с заглавной буквы. Можно использовать буквы и дефис",
	},
	second_name: {
		pattern: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
		message:
			"Фамилия должна начинаться с заглавной буквы. Можно использовать буквы и дефис",
	},
	login: {
		pattern: /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/,
		message:
			"Минимум 3 символа, разрешены латиница, цифры, дефис или подчёркивание",
	},
	email: {
		pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z.]+$/,
		message: "Некорректный email",
	},
	password: {
		pattern: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
		message: "Минимум 8 символов, одна заглавная буква и одна цифра",
	},
	password_repeat: {
		message: "Пароли должны совпадать",
		validate: (value, { form }) => {
			const passwordInput = form.elements.namedItem("new_password");

			return (
				passwordInput instanceof HTMLInputElement &&
				value === passwordInput.value
			);
		},
	},
	phone: {
		pattern: /^\+?\d{10,15}$/,
		message: "Некорректный телефон",
	},
	message: {
		pattern: /^(?!\s*$).+/,
		message: "Поле не может быть пустым",
	},
};

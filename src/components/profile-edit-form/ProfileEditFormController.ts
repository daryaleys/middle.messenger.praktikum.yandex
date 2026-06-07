import { passwordAPI, profileAPI } from "@src/api";
import { router } from "@src/router/router";
import { ROUTES } from "@src/router/routes";
import { setUser } from "@src/store";
import type { FormValues } from "@src/utils/validation";

import { ProfileEditFormModel } from "./ProfileEditFormModel";
import {
	PROFILE_EDIT_FORM_MODE,
	type ProfileEditFormProps,
} from "./types";

export class ProfileEditFormController {
	private readonly model: ProfileEditFormModel;

	constructor(model: ProfileEditFormModel) {
		this.model = model;
	}

	getViewModel(): Required<ProfileEditFormProps> {
		return this.model.getFormData();
	}

	async update(values: FormValues) {
		try {
			if (this.model.getMode() === PROFILE_EDIT_FORM_MODE.password) {
				await passwordAPI.request({
					oldPassword: values.old_password,
					newPassword: values.new_password,
				});
			} else {
				const user = await profileAPI.request({
					email: values.email,
					login: values.login,
					first_name: values.first_name,
					second_name: values.second_name,
					display_name: values.display_name,
					phone: values.phone,
				});
				setUser(user);
			}

			router.go(ROUTES.settings);
		} catch {
			return "Не удалось сохранить изменения. Проверьте данные и попробуйте еще раз.";
		}
	}
}

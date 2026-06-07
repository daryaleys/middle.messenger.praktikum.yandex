import { setGuest } from "@src/store";
import { logoutAPI } from "@src/api/auth/logout-api";
import { router } from "@src/router/router";
import { ROUTES } from "@src/router/routes";

import { ProfileActionsModel } from "./ProfileActionsModel";
import type { ProfileActionsProps } from "./types";

export class ProfileActionsController {
	private readonly model: ProfileActionsModel;

	constructor(model: ProfileActionsModel) {
		this.model = model;
	}

	getViewModel(): Required<ProfileActionsProps> {
		return this.model.getActionsData();
	}

	async logout() {
		try {
			await logoutAPI.request();
			setGuest();
			router.go(ROUTES.login);
		} catch (error) {
			return "Не удалось выйти. Попробуйте еще раз.";
		}
	}
}

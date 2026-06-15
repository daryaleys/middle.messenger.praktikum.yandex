import { resetUser, setGuest } from "@src/store";
import { logoutAPI } from "@src/api";
import { ROUTES, router } from "@src/router";

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
			resetUser();
			router.go(ROUTES.login);
		} catch {
			return "Не удалось выйти. Попробуйте еще раз.";
		}
	}
}

import { router } from "@src/router/router";
import { ROUTES } from "@src/router/routes";
import { getUser, resetUser, setGuest } from "@src/store";

import { ProfileModel } from "./ProfileModel";
import type { ProfileMode, ProfilePageProps } from "./types";

export class ProfileController {
	private readonly model: ProfileModel;
	private readonly mode: ProfileMode;

	constructor(mode: ProfileMode, model = new ProfileModel()) {
		this.model = model;
		this.mode = mode;
	}

	getViewModel(): ProfilePageProps {
		return {
			isDataEditMode: this.mode === "edit",
			isPasswordEditMode: this.mode === "password",
			profileData: this.model.getProfileData(),
		};
	}

	async loadProfileData(): Promise<ProfilePageProps> {
		const user = getUser();

		if (!user) {
			this.redirectToLogin();
			throw new Error("User is not found");
		}

		const model = new ProfileModel(user);

		return {
			isDataEditMode: this.mode === "edit",
			isPasswordEditMode: this.mode === "password",
			profileData: model.getProfileData(),
		};
	}

	private redirectToLogin() {
		setGuest();
		resetUser();
		router.go(ROUTES.login);
	}
}

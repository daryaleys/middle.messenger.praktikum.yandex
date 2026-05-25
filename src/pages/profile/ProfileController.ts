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
}

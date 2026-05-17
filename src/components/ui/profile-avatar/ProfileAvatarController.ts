import { ProfileAvatarModel } from "./ProfileAvatarModel";
import type { ProfileAvatarProps } from "./types";

export class ProfileAvatarController {
	private readonly model: ProfileAvatarModel;

	constructor(model: ProfileAvatarModel) {
		this.model = model;
	}

	getViewModel(): Required<ProfileAvatarProps> {
		return this.model.getAvatarData();
	}
}

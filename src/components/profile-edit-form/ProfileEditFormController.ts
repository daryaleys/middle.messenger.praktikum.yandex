import { ProfileEditFormModel } from "./ProfileEditFormModel";
import type { ProfileEditFormProps } from "./types";

export class ProfileEditFormController {
	private readonly model: ProfileEditFormModel;

	constructor(model: ProfileEditFormModel) {
		this.model = model;
	}

	getViewModel(): Required<ProfileEditFormProps> {
		return this.model.getFormData();
	}
}

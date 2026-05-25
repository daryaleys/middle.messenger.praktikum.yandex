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
}

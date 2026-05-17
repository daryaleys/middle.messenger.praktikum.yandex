import { ProfileDetailsModel } from "./ProfileDetailsModel";
import type { ProfileDetailsProps } from "./types";

export class ProfileDetailsController {
	private readonly model: ProfileDetailsModel;

	constructor(model: ProfileDetailsModel) {
		this.model = model;
	}

	getViewModel(): ProfileDetailsProps {
		return this.model.getDetailsData();
	}
}

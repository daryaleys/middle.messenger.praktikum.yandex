import { ProfileFormFieldModel } from "./ProfileFormFieldModel";
import type { ProfileFormFieldViewProps } from "./types";

export class ProfileFormFieldController {
	private readonly model: ProfileFormFieldModel;

	constructor(model: ProfileFormFieldModel) {
		this.model = model;
	}

	getViewModel(): ProfileFormFieldViewProps {
		return this.model.getFieldData();
	}
}

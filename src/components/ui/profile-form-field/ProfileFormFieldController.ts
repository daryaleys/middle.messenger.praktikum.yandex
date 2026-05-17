import { ProfileFormFieldModel } from "./ProfileFormFieldModel";
import type { ProfileFormFieldProps } from "./types";

export class ProfileFormFieldController {
	private readonly model: ProfileFormFieldModel;

	constructor(model: ProfileFormFieldModel) {
		this.model = model;
	}

	getViewModel(): ProfileFormFieldProps {
		return this.model.getFieldData();
	}
}

import { AuthFormModel } from "./AuthFormModel";
import type { AuthFormProps } from "./types";

export class AuthFormController {
	private readonly model: AuthFormModel;

	constructor(model: AuthFormModel) {
		this.model = model;
	}

	getViewModel(): AuthFormProps {
		return this.model.getFormData();
	}
}

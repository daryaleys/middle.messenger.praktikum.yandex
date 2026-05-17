import { AuthFieldModel } from "./AuthFieldModel";
import type { AuthFieldProps } from "./types";

export class AuthFieldController {
	private readonly model: AuthFieldModel;

	constructor(model: AuthFieldModel) {
		this.model = model;
	}

	getViewModel(): AuthFieldProps {
		return this.model.getFieldData();
	}
}

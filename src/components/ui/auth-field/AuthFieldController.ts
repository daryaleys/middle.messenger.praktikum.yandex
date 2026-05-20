import { AuthFieldModel } from "./AuthFieldModel";
import type { AuthFieldViewProps } from "./types";

export class AuthFieldController {
	private readonly model: AuthFieldModel;

	constructor(model: AuthFieldModel) {
		this.model = model;
	}

	getViewModel(): AuthFieldViewProps {
		return this.model.getFieldData();
	}
}

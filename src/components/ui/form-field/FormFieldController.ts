import { FormFieldModel } from "./FormFieldModel";
import type { FormFieldViewProps } from "./types";

export class FormFieldController {
	private readonly model: FormFieldModel;

	constructor(model: FormFieldModel) {
		this.model = model;
	}

	getViewModel(): FormFieldViewProps {
		return this.model.getFieldData();
	}
}

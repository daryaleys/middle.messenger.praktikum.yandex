import { InlineFormFieldModel } from "./InlineFormFieldModel";
import type { InlineFormFieldViewProps } from "./types";

export class InlineFormFieldController {
	private readonly model: InlineFormFieldModel;

	constructor(model: InlineFormFieldModel) {
		this.model = model;
	}

	getViewModel(): InlineFormFieldViewProps {
		return this.model.getFieldData();
	}
}

import { Block } from "@src/core";

import template from "./form-field.hbs?raw";
import { FormFieldController } from "./FormFieldController";
import { FormFieldModel } from "./FormFieldModel";
import type { FormFieldProps } from "./types";

export class FormField extends Block<FormFieldProps> {
	static componentName = "FormField";

	protected template = template;

	constructor(
		props: FormFieldProps,
		controller = new FormFieldController(new FormFieldModel(props)),
	) {
		super(controller.getViewModel());
	}
}

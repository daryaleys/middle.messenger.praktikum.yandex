import { Block } from "@src/core";

import template from "./inline-form-field.hbs?raw";
import { InlineFormFieldController } from "./InlineFormFieldController";
import { InlineFormFieldModel } from "./InlineFormFieldModel";
import type { InlineFormFieldProps } from "./types";

export class InlineFormField extends Block<InlineFormFieldProps> {
	static componentName = "InlineFormField";

	protected template = template;

	constructor(
		props: InlineFormFieldProps,
		controller = new InlineFormFieldController(
			new InlineFormFieldModel(props),
		),
	) {
		super(controller.getViewModel());
	}
}

import Block from "@src/core/Block";

import template from "./submit-button.hbs?raw";
import { SubmitButtonController } from "./SubmitButtonController";
import { SubmitButtonModel } from "./SubmitButtonModel";
import type { SubmitButtonProps } from "./types";

export class SubmitButton extends Block<Required<SubmitButtonProps>> {
	static componentName = "SubmitButton";

	protected template = template;

	constructor(
		props: SubmitButtonProps = {},
		controller = new SubmitButtonController(new SubmitButtonModel(props)),
	) {
		super(controller.getViewModel());
	}
}

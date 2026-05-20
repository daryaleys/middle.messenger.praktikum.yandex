import Block from "@src/core/Block";

import template from "./input.hbs?raw";
import { InputController } from "./InputController";
import { InputModel } from "./InputModel";
import type { InputProps } from "./types";

export class Input extends Block<InputProps> {
	static componentName = "Input";

	protected template = template;

	constructor(
		props: InputProps,
		controller = new InputController(new InputModel(props)),
	) {
		super(controller.getViewModel());
	}
}

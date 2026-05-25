import Block from "@src/core/Block";

import template from "./auth-field.hbs?raw";
import { AuthFieldController } from "./AuthFieldController";
import { AuthFieldModel } from "./AuthFieldModel";
import type { AuthFieldProps } from "./types";

export class AuthField extends Block<AuthFieldProps> {
	static componentName = "AuthField";

	protected template = template;

	constructor(
		props: AuthFieldProps,
		controller = new AuthFieldController(new AuthFieldModel(props)),
	) {
		super(controller.getViewModel());
	}
}

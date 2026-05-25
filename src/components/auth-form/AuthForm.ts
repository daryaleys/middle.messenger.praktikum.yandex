import Block from "@src/core/Block";

import template from "./auth-form.hbs?raw";
import { AuthFormController } from "./AuthFormController";
import { AuthFormModel } from "./AuthFormModel";
import type { AuthFormProps } from "./types";

export class AuthForm extends Block<AuthFormProps> {
	static componentName = "AuthForm";

	protected template = template;

	constructor(
		props: AuthFormProps,
		controller = new AuthFormController(new AuthFormModel(props)),
	) {
		super(controller.getViewModel());
	}
}

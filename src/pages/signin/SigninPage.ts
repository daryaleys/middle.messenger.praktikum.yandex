import Block from "@src/core/Block";

import template from "./signin.hbs?raw";
import { SigninController } from "./SigninController";
import type { SigninPageProps } from "./types";

export class SigninPage extends Block<SigninPageProps> {
	protected template = template;

	constructor(controller = new SigninController()) {
		super(controller.getViewModel());
	}
}

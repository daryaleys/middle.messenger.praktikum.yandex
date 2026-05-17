import Block from "@src/core/Block";

import template from "./login.hbs?raw";
import { LoginController } from "./LoginController";
import type { LoginPageProps } from "./types";

export class LoginPage extends Block<LoginPageProps> {
	protected template = template;

	constructor(controller = new LoginController()) {
		super(controller.getViewModel());
	}
}

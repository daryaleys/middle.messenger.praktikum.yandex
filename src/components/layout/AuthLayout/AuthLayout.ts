import Block from "@src/core/Block";

import template from "./AuthLayout.hbs?raw";
import { AuthLayoutController } from "./AuthLayoutController";
import { AuthLayoutModel } from "./AuthLayoutModel";
import type { AuthLayoutProps } from "./types";

export class AuthLayout extends Block<AuthLayoutProps> {
	protected template = template;

	constructor(
		props: AuthLayoutProps,
		controller = new AuthLayoutController(new AuthLayoutModel(props)),
	) {
		super(controller.getViewModel());
	}
}

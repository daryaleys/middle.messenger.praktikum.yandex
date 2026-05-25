import Block from "@src/core/Block";

import template from "./auth-layout.hbs?raw";
import { AuthLayoutController } from "./AuthLayoutController";
import { AuthLayoutModel } from "./AuthLayoutModel";
import type { AuthLayoutProps } from "./types";

export class AuthLayout extends Block<AuthLayoutProps> {
	static componentName = "AuthLayout";

	protected template = template;

	constructor(
		props: AuthLayoutProps,
		controller = new AuthLayoutController(new AuthLayoutModel(props)),
	) {
		super(controller.getViewModel());
	}
}

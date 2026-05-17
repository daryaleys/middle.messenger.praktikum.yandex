import Block from "@src/core/Block";

import template from "./not-found.hbs?raw";
import { NotFoundController } from "./NotFoundController";
import type { NotFoundPageProps } from "./types";

export class NotFoundPage extends Block<NotFoundPageProps> {
	protected template = template;

	constructor(controller = new NotFoundController()) {
		super(controller.getViewModel());
	}
}

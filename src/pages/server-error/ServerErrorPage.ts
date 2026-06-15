import { Block } from "@src/core";

import template from "./server-error.hbs?raw";
import { ServerErrorController } from "./ServerErrorController";
import type { ServerErrorPageProps } from "./types";

export class ServerErrorPage extends Block<ServerErrorPageProps> {
	protected template = template;

	constructor(controller = new ServerErrorController()) {
		super(controller.getViewModel());
	}
}

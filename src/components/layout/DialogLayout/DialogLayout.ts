import Block from "@src/core/Block";

import template from "./DialogLayout.hbs?raw";
import { DialogLayoutController } from "./DialogLayoutController";
import { DialogLayoutModel } from "./DialogLayoutModel";
import type { DialogLayoutProps } from "./types";

export class DialogLayout extends Block<DialogLayoutProps> {
	protected template = template;

	constructor(
		props: DialogLayoutProps,
		controller = new DialogLayoutController(new DialogLayoutModel(props)),
	) {
		super(controller.getViewModel());
	}
}

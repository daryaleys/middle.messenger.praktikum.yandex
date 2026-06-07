import { Block } from "@src/core";

import template from "./dialog-layout.hbs?raw";
import { DialogLayoutController } from "./DialogLayoutController";
import { DialogLayoutModel } from "./DialogLayoutModel";
import type { DialogLayoutProps, DialogLayoutViewModel } from "./types";

export class DialogLayout extends Block<DialogLayoutViewModel> {
	static componentName = "DialogLayout";

	protected template = template;

	constructor(
		props: DialogLayoutProps,
		controller = new DialogLayoutController(new DialogLayoutModel(props)),
	) {
		super(controller.getViewModel());
	}
}

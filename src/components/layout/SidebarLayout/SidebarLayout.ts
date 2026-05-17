import Block from "@src/core/Block";

import template from "./SidebarLayout.hbs?raw";
import { SidebarLayoutController } from "./SidebarLayoutController";
import { SidebarLayoutModel } from "./SidebarLayoutModel";
import type { SidebarLayoutProps } from "./types";

export class SidebarLayout extends Block<SidebarLayoutProps> {
	protected template = template;

	constructor(
		props: SidebarLayoutProps,
		controller = new SidebarLayoutController(new SidebarLayoutModel(props)),
	) {
		super(controller.getViewModel());
	}
}

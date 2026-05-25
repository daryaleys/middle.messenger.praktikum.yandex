import Block from "@src/core/Block";

import template from "./demo-navigation.hbs?raw";
import { DemoNavigationController } from "./DemoNavigationController";
import { DemoNavigationModel } from "./DemoNavigationModel";
import type { DemoNavigationProps } from "./types";

export class DemoNavigation extends Block<DemoNavigationProps> {
	static componentName = "DemoNavigation";

	protected template = template;

	constructor(
		props: DemoNavigationProps,
		controller = new DemoNavigationController(new DemoNavigationModel(props)),
	) {
		super(controller.getViewModel());
	}
}

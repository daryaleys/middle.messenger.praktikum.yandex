import Block from "@src/core/Block";

import template from "./service-layout.hbs?raw";
import { ServiceLayoutController } from "./ServiceLayoutController";
import { ServiceLayoutModel } from "./ServiceLayoutModel";
import type { ServiceLayoutProps } from "./types";

export class ServiceLayout extends Block<ServiceLayoutProps> {
	static componentName = "ServiceLayout";

	protected template = template;

	constructor(
		props: ServiceLayoutProps,
		controller = new ServiceLayoutController(new ServiceLayoutModel(props)),
	) {
		super(controller.getViewModel());
	}
}

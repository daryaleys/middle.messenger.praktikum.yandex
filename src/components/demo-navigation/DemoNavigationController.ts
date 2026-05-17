import { DemoNavigationModel } from "./DemoNavigationModel";
import type { DemoNavigationProps } from "./types";

export class DemoNavigationController {
	private readonly model: DemoNavigationModel;

	constructor(model: DemoNavigationModel) {
		this.model = model;
	}

	getViewModel(): DemoNavigationProps {
		return this.model.getNavigationData();
	}
}

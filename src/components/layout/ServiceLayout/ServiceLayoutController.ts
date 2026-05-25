import { ServiceLayoutModel } from "./ServiceLayoutModel";
import type { ServiceLayoutProps } from "./types";

export class ServiceLayoutController {
	private readonly model: ServiceLayoutModel;

	constructor(model: ServiceLayoutModel) {
		this.model = model;
	}

	getViewModel(): ServiceLayoutProps {
		return this.model.getLayoutData();
	}
}

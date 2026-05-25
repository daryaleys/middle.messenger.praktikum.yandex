import { DialogLayoutModel } from "./DialogLayoutModel";
import type { DialogLayoutProps } from "./types";

export class DialogLayoutController {
	private readonly model: DialogLayoutModel;

	constructor(model: DialogLayoutModel) {
		this.model = model;
	}

	getViewModel(): DialogLayoutProps {
		return this.model.getLayoutData();
	}
}

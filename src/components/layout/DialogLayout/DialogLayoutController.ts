import { DialogLayoutModel } from "./DialogLayoutModel";
import type { DialogLayoutViewModel } from "./types";

export class DialogLayoutController {
	private readonly model: DialogLayoutModel;

	constructor(model: DialogLayoutModel) {
		this.model = model;
	}

	getViewModel(): DialogLayoutViewModel {
		return this.model.getLayoutData();
	}
}

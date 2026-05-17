import { SubmitButtonModel } from "./SubmitButtonModel";
import type { SubmitButtonProps } from "./types";

export class SubmitButtonController {
	private readonly model: SubmitButtonModel;

	constructor(model: SubmitButtonModel) {
		this.model = model;
	}

	getViewModel(): Required<SubmitButtonProps> {
		return this.model.getButtonData();
	}
}

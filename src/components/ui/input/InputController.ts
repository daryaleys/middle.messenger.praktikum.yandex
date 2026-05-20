import { InputModel } from "./InputModel";
import type { InputProps } from "./types";

export class InputController {
	private readonly model: InputModel;

	constructor(model: InputModel) {
		this.model = model;
	}

	getViewModel(): InputProps {
		return this.model.getInputData();
	}
}

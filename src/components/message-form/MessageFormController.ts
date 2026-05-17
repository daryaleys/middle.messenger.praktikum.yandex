import { MessageFormModel } from "./MessageFormModel";
import type { MessageFormProps } from "./types";

export class MessageFormController {
	private readonly model: MessageFormModel;

	constructor(model: MessageFormModel) {
		this.model = model;
	}

	getViewModel(): MessageFormProps {
		return this.model.getFormData();
	}
}

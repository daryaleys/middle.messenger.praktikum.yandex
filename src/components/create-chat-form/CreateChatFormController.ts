import { CreateChatFormModel } from "./CreateChatFormModel";
import type { CreateChatFormProps } from "./types";

export class CreateChatFormController {
	private readonly model: CreateChatFormModel;

	constructor(model: CreateChatFormModel) {
		this.model = model;
	}

	getViewModel(): CreateChatFormProps {
		return this.model.getFormData();
	}
}

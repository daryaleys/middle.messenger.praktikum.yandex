import { ChatUserFormModel } from "./ChatUserFormModel";
import type { ChatUserFormProps } from "./types";

export class ChatUserFormController {
	private readonly model: ChatUserFormModel;

	constructor(model: ChatUserFormModel) {
		this.model = model;
	}

	getViewModel(): ChatUserFormProps {
		return this.model.getFormData();
	}
}

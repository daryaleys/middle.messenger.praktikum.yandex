import { Block } from "@src/core";
import { initFormValidation } from "@src/utils/validation";

import template from "./create-chat-form.hbs?raw";
import { CreateChatFormController } from "./CreateChatFormController";
import { CreateChatFormModel } from "./CreateChatFormModel";
import type { CreateChatFormProps } from "./types";

export class CreateChatForm extends Block<CreateChatFormProps> {
	static componentName = "CreateChatForm";

	protected template = template;

	constructor(
		props: CreateChatFormProps,
		controller = new CreateChatFormController(new CreateChatFormModel(props)),
	) {
		super(controller.getViewModel());
	}

	protected componentDidMount() {
		const element = this.element();
		const form = element instanceof HTMLFormElement ? element : null;

		if (form) {
			initFormValidation(form, {
				onSubmit: (values) => this.handleSubmit(values),
			});
		}
	}

	private handleSubmit(values: Record<string, string>) {
		console.log("create-chat", values);
	}
}

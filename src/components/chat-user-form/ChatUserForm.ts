import { Block } from "@src/core";
import { initFormValidation } from "@src/utils/validation";

import template from "./chat-user-form.hbs?raw";
import { ChatUserFormController } from "./ChatUserFormController";
import { ChatUserFormModel } from "./ChatUserFormModel";
import type { ChatUserFormProps } from "./types";

export class ChatUserForm extends Block<ChatUserFormProps> {
	static componentName = "ChatUserForm";

	protected template = template;

	constructor(
		props: ChatUserFormProps,
		controller = new ChatUserFormController(new ChatUserFormModel(props)),
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
		console.log(this.props.action, values);
	}
}

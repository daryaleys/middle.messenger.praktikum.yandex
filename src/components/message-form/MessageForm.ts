import Block from "@src/core/Block";
import {
	initFormValidation,
	type FormValidationState,
} from "@src/utils/validation";

import template from "./message-form.hbs?raw";
import { MessageFormController } from "./MessageFormController";
import { MessageFormModel } from "./MessageFormModel";
import type { MessageFormProps } from "./types";

export class MessageForm extends Block<MessageFormProps> {
	static componentName = "MessageForm";

	protected template = template;

	constructor(
		props: MessageFormProps,
		controller = new MessageFormController(new MessageFormModel(props)),
	) {
		super(controller.getViewModel());
	}

	protected componentDidMount() {
		const element = this.element();
		const form = element instanceof HTMLFormElement ? element : null;

		if (form) {
			initFormValidation(form, {
				onValidate: (state) => this.updateFormState(state),
				onSubmit: (values) => this.handleSubmit(values),
			});
		}
	}

	private updateFormState({ formErrors, formValues }: FormValidationState) {
		this.setProps({
			formErrors,
			formValues,
		});
	}

	private handleSubmit(values: Record<string, string>) {
		console.log(values);
	}
}

import Block from "@src/core/Block";
import {
	initFormValidation,
	type FormValidationState,
} from "@src/utils/validation";

import template from "./chats.hbs?raw";
import { ChatsController } from "./ChatsController";
import type { ChatsPageProps } from "./types";

export class ChatsPage extends Block<ChatsPageProps> {
	protected template = template;

	constructor(controller = new ChatsController()) {
		super(controller.getViewModel());
	}

	protected componentDidMount() {
		const element = this.element();
		const form = element?.querySelector<HTMLFormElement>(".message-form");

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

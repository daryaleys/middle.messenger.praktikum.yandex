import Block from "@src/core/Block";
import {
	initFormValidation,
	type FormValidationState,
} from "@src/utils/validation";

import template from "./signin.hbs?raw";
import { SigninController } from "./SigninController";
import type { SigninPageProps } from "./types";

export class SigninPage extends Block<SigninPageProps> {
	protected template = template;

	constructor(controller = new SigninController()) {
		super(controller.getViewModel());
	}

	protected componentDidMount() {
		const element = this.element();
		const form = element?.querySelector<HTMLFormElement>(".auth-form");

		if (form) {
			initFormValidation(form, {
				onValidate: (state) => this.updateFormState(state),
				onSubmit: (values) => this.handleSubmit(values),
			});
		}
	}

	private updateFormState({ formErrors, formValues }: FormValidationState) {
		this.setProps({
			signInPageData: {
				...this.props.signInPageData,
				formErrors,
				formValues,
			},
		});
	}

	private handleSubmit(values: Record<string, string>) {
		console.log(values);
	}
}

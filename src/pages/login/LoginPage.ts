import Block from "@src/core/Block";
import {
	initFormValidation,
	type FormValidationState,
} from "@src/utils/validation";

import template from "./login.hbs?raw";
import { LoginController } from "./LoginController";
import type { LoginPageProps } from "./types";

export class LoginPage extends Block<LoginPageProps> {
	protected template = template;

	constructor(controller = new LoginController()) {
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
			loginPageData: {
				...this.props.loginPageData,
				formErrors,
				formValues,
			},
		});
	}

	private handleSubmit(values: Record<string, string>) {
		console.log(values);
	}
}

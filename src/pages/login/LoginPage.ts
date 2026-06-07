import { Block } from "@src/core";
import { initFormValidation } from "@src/utils/validation";

import template from "./login.hbs?raw";
import { LoginController } from "./LoginController";
import type { LoginPageProps } from "./types";

export class LoginPage extends Block<LoginPageProps> {
	protected template = template;

	private readonly controller: LoginController;

	constructor(controller = new LoginController()) {
		super(controller.getViewModel());
		this.controller = controller;
	}

	protected componentDidMount() {
		const element = this.element();
		const form = element?.querySelector<HTMLFormElement>(".auth-form");

		if (form) {
			initFormValidation(form, {
				onSubmit: (values) => this.handleSubmit(values),
			});
		}
	}

	private async handleSubmit(values: Record<string, string>) {
		if (this.props.loginPageData.isLoading) {
			return;
		}

		this.setProps({
			loginPageData: {
				...this.props.loginPageData,
				formValues: values,
				isLoading: true,
				submitError: "",
			},
		});

		try {
			const submitError = await this.controller.login(values);

			if (submitError) {
				this.setSubmitError(submitError);
			}
		} finally {
			this.setLoading(false);
		}
	}

	private setSubmitError(submitError: string) {
		this.setProps({
			loginPageData: {
				...this.props.loginPageData,
				submitError,
			},
		});
	}

	private setLoading(isLoading: boolean) {
		this.setProps({
			loginPageData: {
				...this.props.loginPageData,
				isLoading,
			},
		});
	}
}

import { Block } from "@src/core";
import { initFormValidation } from "@src/utils/validation";

import template from "./signin.hbs?raw";
import { SigninController } from "./SigninController";
import type { SigninPageProps } from "./types";

export class SigninPage extends Block<SigninPageProps> {
	protected template = template;

	private readonly controller: SigninController;

	constructor(controller = new SigninController()) {
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
		if (this.props.signInPageData.isLoading) {
			return;
		}

		this.setProps({
			signInPageData: {
				...this.props.signInPageData,
				formValues: values,
				isLoading: true,
				submitError: "",
			},
		});

		try {
			const submitError = await this.controller.signup(values);

			if (submitError) {
				this.setSubmitError(submitError);
			}
		} finally {
			this.setLoading(false);
		}
	}

	private setSubmitError(submitError: string) {
		this.setProps({
			signInPageData: {
				...this.props.signInPageData,
				submitError,
			},
		});
	}

	private setLoading(isLoading: boolean) {
		this.setProps({
			signInPageData: {
				...this.props.signInPageData,
				isLoading,
			},
		});
	}
}

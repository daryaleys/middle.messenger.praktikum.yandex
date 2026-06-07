import { Block } from "@src/core";
import { initFormValidation } from "@src/utils/validation";

import template from "./profile-edit-form.hbs?raw";
import { ProfileEditFormController } from "./ProfileEditFormController";
import { ProfileEditFormModel } from "./ProfileEditFormModel";
import type { ProfileEditFormProps } from "./types";

export class ProfileEditForm extends Block<Required<ProfileEditFormProps>> {
	static componentName = "ProfileEditForm";

	protected template = template;

	private readonly controller: ProfileEditFormController;

	constructor(
		props: ProfileEditFormProps,
		controller = new ProfileEditFormController(
			new ProfileEditFormModel(props),
		),
	) {
		super(controller.getViewModel());
		this.controller = controller;
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

	private async handleSubmit(values: Record<string, string>) {
		if (this.props.isLoading) {
			return;
		}

		this.setProps({
			formValues: values,
			isLoading: true,
			submitError: "",
		});

		const submitError = await this.controller.update(values);

		if (submitError) {
			this.setProps({
				isLoading: false,
				submitError,
			});
		}
	}
}

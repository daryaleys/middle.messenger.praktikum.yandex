import Block from "@src/core/Block";
import {
	initFormValidation,
	type FormValidationState,
} from "@src/utils/validation";

import template from "./profile-edit-form.hbs?raw";
import { ProfileEditFormController } from "./ProfileEditFormController";
import { ProfileEditFormModel } from "./ProfileEditFormModel";
import type { ProfileEditFormProps } from "./types";

export class ProfileEditForm extends Block<Required<ProfileEditFormProps>> {
	static componentName = "ProfileEditForm";

	protected template = template;

	constructor(
		props: ProfileEditFormProps,
		controller = new ProfileEditFormController(
			new ProfileEditFormModel(props),
		),
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

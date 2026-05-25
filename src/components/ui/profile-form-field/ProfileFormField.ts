import Block from "@src/core/Block";

import template from "./profile-form-field.hbs?raw";
import { ProfileFormFieldController } from "./ProfileFormFieldController";
import { ProfileFormFieldModel } from "./ProfileFormFieldModel";
import type { ProfileFormFieldProps } from "./types";

export class ProfileFormField extends Block<ProfileFormFieldProps> {
	static componentName = "ProfileFormField";

	protected template = template;

	constructor(
		props: ProfileFormFieldProps,
		controller = new ProfileFormFieldController(
			new ProfileFormFieldModel(props),
		),
	) {
		super(controller.getViewModel());
	}
}

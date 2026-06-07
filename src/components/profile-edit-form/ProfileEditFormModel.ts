import {
	PROFILE_EDIT_FORM_MODE,
	type ProfileEditFormProps,
} from "./types";

export class ProfileEditFormModel {
	private readonly props: ProfileEditFormProps;

	constructor(props: ProfileEditFormProps) {
		this.props = props;
	}

	getFormData(): Required<ProfileEditFormProps> {
		return {
			fields: this.props.fields,
			formErrors: this.props.formErrors ?? {},
			formValues: this.props.formValues ?? {},
			isLoading: this.props.isLoading ?? false,
			mode: this.props.mode ?? PROFILE_EDIT_FORM_MODE.edit,
			submitError: this.props.submitError ?? "",
			submitText: this.props.submitText ?? "Сохранить",
		};
	}

	getMode() {
		return this.props.mode ?? PROFILE_EDIT_FORM_MODE.edit;
	}
}

import type { ProfileEditFormProps } from "./types";

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
			submitText: this.props.submitText ?? "Сохранить",
		};
	}
}

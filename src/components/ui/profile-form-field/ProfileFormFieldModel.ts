import type {
	ProfileFormFieldProps,
	ProfileFormFieldViewProps,
} from "./types";

export class ProfileFormFieldModel {
	private readonly props: ProfileFormFieldProps;

	constructor(props: ProfileFormFieldProps) {
		this.props = props;
	}

	getFieldData(): ProfileFormFieldViewProps {
		const inputId = `profile-${this.props.name}`;
		const errorMessage =
			this.props.error ?? this.props.formErrors?.[this.props.name] ?? "";

		return {
			...this.props,
			errorId: `${inputId}-error`,
			errorMessage,
			inputId,
			inputValue:
				this.props.formValues?.[this.props.name] ?? this.props.value ?? "",
			isInvalid: Boolean(errorMessage),
		};
	}
}

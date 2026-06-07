import type { FormFieldProps, FormFieldViewProps } from "./types";

export class FormFieldModel {
	private readonly props: FormFieldProps;

	constructor(props: FormFieldProps) {
		this.props = props;
	}

	getFieldData(): FormFieldViewProps {
		const inputId = `field-${this.props.name}`;
		const errorMessage =
			this.props.error ?? this.props.formErrors?.[this.props.name] ?? "";

		return {
			...this.props,
			errorId: `${inputId}-error`,
			errorMessage,
			inputId,
			isInvalid: Boolean(errorMessage),
		};
	}
}

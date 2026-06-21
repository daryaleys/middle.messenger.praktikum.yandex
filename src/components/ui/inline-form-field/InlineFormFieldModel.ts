import type {
	InlineFormFieldProps,
	InlineFormFieldViewProps,
} from "./types";

export class InlineFormFieldModel {
	private readonly props: InlineFormFieldProps;

	constructor(props: InlineFormFieldProps) {
		this.props = props;
	}

	getFieldData(): InlineFormFieldViewProps {
		const inputId = `inline-field-${this.props.name}`;
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

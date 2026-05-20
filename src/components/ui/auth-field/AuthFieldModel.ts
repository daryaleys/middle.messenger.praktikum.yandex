import type { AuthFieldProps, AuthFieldViewProps } from "./types";

export class AuthFieldModel {
	private readonly props: AuthFieldProps;

	constructor(props: AuthFieldProps) {
		this.props = props;
	}

	getFieldData(): AuthFieldViewProps {
		const inputId = `auth-${this.props.name}`;
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

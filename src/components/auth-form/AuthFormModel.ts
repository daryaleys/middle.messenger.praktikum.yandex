import type { AuthFormProps } from "./types";

export class AuthFormModel {
	private readonly props: AuthFormProps;

	constructor(props: AuthFormProps) {
		this.props = props;
	}

	getFormData(): AuthFormProps {
		return this.props;
	}
}

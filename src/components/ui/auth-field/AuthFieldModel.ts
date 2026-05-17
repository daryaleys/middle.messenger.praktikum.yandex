import type { AuthFieldProps } from "./types";

export class AuthFieldModel {
	private readonly props: AuthFieldProps;

	constructor(props: AuthFieldProps) {
		this.props = props;
	}

	getFieldData(): AuthFieldProps {
		return this.props;
	}
}

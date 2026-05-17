import type { ProfileFormFieldProps } from "./types";

export class ProfileFormFieldModel {
	private readonly props: ProfileFormFieldProps;

	constructor(props: ProfileFormFieldProps) {
		this.props = props;
	}

	getFieldData(): ProfileFormFieldProps {
		return this.props;
	}
}

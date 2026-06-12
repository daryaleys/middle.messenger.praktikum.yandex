import type { AddUserToChatFormProps } from "./types";

export class AddUserToChatFormModel {
	private readonly props: AddUserToChatFormProps;

	constructor(props: AddUserToChatFormProps) {
		this.props = props;
	}

	getFormData(): AddUserToChatFormProps {
		return {
			...this.props,
			error: this.props.error ?? null,
			isLoading: this.props.isLoading ?? false,
		};
	}
}

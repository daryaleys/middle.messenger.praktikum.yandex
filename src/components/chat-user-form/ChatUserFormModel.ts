import type { ChatUserFormProps } from "./types";

export class ChatUserFormModel {
	private readonly props: ChatUserFormProps;

	constructor(props: ChatUserFormProps) {
		this.props = props;
	}

	getFormData(): ChatUserFormProps {
		return {
			...this.props,
			error: this.props.error ?? null,
			isLoading: this.props.isLoading ?? false,
		};
	}
}

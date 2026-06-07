import type { CreateChatFormProps } from "./types";

export class CreateChatFormModel {
	private readonly props: CreateChatFormProps;

	constructor(props: CreateChatFormProps) {
		this.props = props;
	}

	getFormData(): CreateChatFormProps {
		return {
			...this.props,
			error: this.props.error ?? null,
			isLoading: this.props.isLoading ?? false,
		};
	}
}

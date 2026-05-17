import type { MessageFormProps } from "./types";

export class MessageFormModel {
	private readonly props: MessageFormProps;

	constructor(props: MessageFormProps) {
		this.props = props;
	}

	getFormData(): MessageFormProps {
		return this.props;
	}
}

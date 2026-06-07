import type { ChatUserFormProps } from "./types";

export class ChatUserFormModel {
	private readonly props: ChatUserFormProps;

	constructor(props: ChatUserFormProps) {
		this.props = props;
	}

	getFormData(): ChatUserFormProps {
		return this.props;
	}
}

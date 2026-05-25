import type { ChatMessageProps } from "./types";

export class ChatMessageModel {
	private readonly props: ChatMessageProps;

	constructor(props: ChatMessageProps) {
		this.props = props;
	}

	getMessageData(): ChatMessageProps {
		return this.props;
	}
}

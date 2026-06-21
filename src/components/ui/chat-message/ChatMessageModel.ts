import { API_BASE_URL } from "@src/api";
import { sanitizeResourceUrl } from "@src/utils/security";
import type { ChatMessageProps } from "./types";

export class ChatMessageModel {
	private readonly props: ChatMessageProps;

	constructor(props: ChatMessageProps) {
		this.props = props;
	}

	getMessageData(): ChatMessageProps {
		return {
			...this.props,
			imageUrl: sanitizeResourceUrl(this.props.imageUrl, API_BASE_URL),
		};
	}
}

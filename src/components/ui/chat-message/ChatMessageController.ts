import { ChatMessageModel } from "./ChatMessageModel";
import type { ChatMessageProps } from "./types";

export class ChatMessageController {
	private readonly model: ChatMessageModel;

	constructor(model: ChatMessageModel) {
		this.model = model;
	}

	getViewModel(): ChatMessageProps {
		return this.model.getMessageData();
	}
}

import Block from "@src/core/Block";

import template from "./chat-message.hbs?raw";
import { ChatMessageController } from "./ChatMessageController";
import { ChatMessageModel } from "./ChatMessageModel";
import type { ChatMessageProps } from "./types";

export class ChatMessage extends Block<ChatMessageProps> {
	static componentName = "ChatMessage";

	protected template = template;

	constructor(
		props: ChatMessageProps,
		controller = new ChatMessageController(new ChatMessageModel(props)),
	) {
		super(controller.getViewModel());
	}
}

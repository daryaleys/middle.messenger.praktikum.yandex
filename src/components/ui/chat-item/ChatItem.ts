import Block from "@src/core/Block";

import template from "./chat-item.hbs?raw";
import { ChatItemController } from "./ChatItemController";
import { ChatItemModel } from "./ChatItemModel";
import type { ChatItemProps } from "./types";

export class ChatItem extends Block<ChatItemProps> {
	static componentName = "ChatItem";

	protected template = template;

	constructor(
		props: ChatItemProps,
		controller = new ChatItemController(new ChatItemModel(props)),
	) {
		super(controller.getViewModel());
	}
}

import Block from "@src/core/Block";

import template from "./chats.hbs?raw";
import { ChatsController } from "./ChatsController";
import type { ChatsPageProps } from "./types";

export class ChatsPage extends Block<ChatsPageProps> {
	protected template = template;

	constructor(controller = new ChatsController()) {
		super(controller.getViewModel());
	}
}

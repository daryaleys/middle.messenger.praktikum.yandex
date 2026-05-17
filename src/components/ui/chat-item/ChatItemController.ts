import { ChatItemModel } from "./ChatItemModel";
import type { ChatItemProps } from "./types";

export class ChatItemController {
	private readonly model: ChatItemModel;

	constructor(model: ChatItemModel) {
		this.model = model;
	}

	getViewModel(): ChatItemProps {
		return this.model.getItemData();
	}
}

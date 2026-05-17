import { ChatsModel } from "./ChatsModel";

export class ChatsController {
	private readonly model: ChatsModel;

	constructor(model = new ChatsModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}
}

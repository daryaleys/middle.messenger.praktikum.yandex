import { NotFoundModel } from "./NotFoundModel";

export class NotFoundController {
	private readonly model: NotFoundModel;

	constructor(model = new NotFoundModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}
}

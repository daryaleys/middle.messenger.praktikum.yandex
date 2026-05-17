import { ServerErrorModel } from "./ServerErrorModel";

export class ServerErrorController {
	private readonly model: ServerErrorModel;

	constructor(model = new ServerErrorModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}
}

import { SigninModel } from "./SigninModel";

export class SigninController {
	private readonly model: SigninModel;

	constructor(model = new SigninModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}
}

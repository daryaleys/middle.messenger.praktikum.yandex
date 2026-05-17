import { LoginModel } from "./LoginModel";

export class LoginController {
	private readonly model: LoginModel;

	constructor(model = new LoginModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}
}

import { AuthLayoutModel } from "./AuthLayoutModel";
import type { AuthLayoutProps } from "./types";

export class AuthLayoutController {
	private readonly model: AuthLayoutModel;

	constructor(model: AuthLayoutModel) {
		this.model = model;
	}

	getViewModel(): AuthLayoutProps {
		return this.model.getLayoutData();
	}
}

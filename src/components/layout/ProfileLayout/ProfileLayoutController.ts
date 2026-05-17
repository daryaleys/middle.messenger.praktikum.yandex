import { ProfileLayoutModel } from "./ProfileLayoutModel";
import type { ProfileLayoutProps } from "./types";

export class ProfileLayoutController {
	private readonly model: ProfileLayoutModel;

	constructor(model: ProfileLayoutModel) {
		this.model = model;
	}

	getViewModel(): ProfileLayoutProps {
		return this.model.getLayoutData();
	}
}

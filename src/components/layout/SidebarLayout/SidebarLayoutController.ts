import { SidebarLayoutModel } from "./SidebarLayoutModel";
import type { SidebarLayoutProps } from "./types";

export class SidebarLayoutController {
	private readonly model: SidebarLayoutModel;

	constructor(model: SidebarLayoutModel) {
		this.model = model;
	}

	getViewModel(): SidebarLayoutProps {
		return this.model.getLayoutData();
	}
}

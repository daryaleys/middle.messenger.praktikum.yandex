import Block from "@src/core/Block";

import template from "./profile-layout.hbs?raw";
import { ProfileLayoutController } from "./ProfileLayoutController";
import { ProfileLayoutModel } from "./ProfileLayoutModel";
import type { ProfileLayoutProps } from "./types";

export class ProfileLayout extends Block<ProfileLayoutProps> {
	static componentName = "ProfileLayout";

	protected template = template;

	constructor(
		props: ProfileLayoutProps,
		controller = new ProfileLayoutController(new ProfileLayoutModel(props)),
	) {
		super(controller.getViewModel());
	}
}

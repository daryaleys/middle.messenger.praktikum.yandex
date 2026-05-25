import Block from "@src/core/Block";

import template from "./profile-actions.hbs?raw";
import { ProfileActionsController } from "./ProfileActionsController";
import { ProfileActionsModel } from "./ProfileActionsModel";
import type { ProfileActionsProps } from "./types";

export class ProfileActions extends Block<Required<ProfileActionsProps>> {
	static componentName = "ProfileActions";

	protected template = template;

	constructor(
		props: ProfileActionsProps = {},
		controller = new ProfileActionsController(new ProfileActionsModel(props)),
	) {
		super(controller.getViewModel());
	}
}

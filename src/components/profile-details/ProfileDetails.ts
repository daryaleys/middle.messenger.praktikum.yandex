import Block from "@src/core/Block";

import template from "./profile-details.hbs?raw";
import { ProfileDetailsController } from "./ProfileDetailsController";
import { ProfileDetailsModel } from "./ProfileDetailsModel";
import type { ProfileDetailsProps } from "./types";

export class ProfileDetails extends Block<ProfileDetailsProps> {
	static componentName = "ProfileDetails";

	protected template = template;

	constructor(
		props: ProfileDetailsProps,
		controller = new ProfileDetailsController(new ProfileDetailsModel(props)),
	) {
		super(controller.getViewModel());
	}
}

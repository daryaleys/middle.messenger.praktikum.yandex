import Block from "@src/core/Block";

import template from "./profile-avatar.hbs?raw";
import { ProfileAvatarController } from "./ProfileAvatarController";
import { ProfileAvatarModel } from "./ProfileAvatarModel";
import type { ProfileAvatarProps } from "./types";

export class ProfileAvatar extends Block<Required<ProfileAvatarProps>> {
	static componentName = "ProfileAvatar";

	protected template = template;

	constructor(
		props: ProfileAvatarProps = {},
		controller = new ProfileAvatarController(new ProfileAvatarModel(props)),
	) {
		super(controller.getViewModel());
	}
}

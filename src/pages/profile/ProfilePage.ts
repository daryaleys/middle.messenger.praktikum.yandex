import Block from "@src/core/Block";

import template from "./profile.hbs?raw";
import { ProfileController } from "./ProfileController";
import type { ProfileMode, ProfilePageProps } from "./types";

export class ProfilePage extends Block<ProfilePageProps> {
	protected template = template;

	constructor(mode: ProfileMode, controller = new ProfileController(mode)) {
		super(controller.getViewModel());
	}
}

import { Block } from "@src/core";
import { isEqual } from "@src/utils/object";

import template from "./profile.hbs?raw";
import { ProfileController } from "./ProfileController";
import type { ProfileMode, ProfilePageProps } from "./types";

export class ProfilePage extends Block<ProfilePageProps> {
	protected template = template;

	private readonly controller: ProfileController;

	constructor(mode: ProfileMode, controller = new ProfileController(mode)) {
		super(controller.getViewModel());
		this.controller = controller;
	}

	protected async componentDidMount() {
		try {
			const profileProps = await this.controller.loadProfileData();

			if (!this.isSameProfileProps(profileProps)) {
				this.setProps(profileProps);
			}
		} catch {
			// Редирект при отсутствии пользователя выполняет контроллер.
		}
	}

	private isSameProfileProps(nextProps: ProfilePageProps) {
		return isEqual(this.getOwnProps(), nextProps);
	}
}

import { Block } from "@src/core";
import { getUser } from "@src/store";
import { ProfileModel } from "@src/pages/profile/ProfileModel";

import template from "./profile-avatar.hbs?raw";
import { ProfileAvatarController } from "./ProfileAvatarController";
import { ProfileAvatarModel } from "./ProfileAvatarModel";
import type { ProfileAvatarProps } from "./types";

export class ProfileAvatar extends Block<Required<ProfileAvatarProps>> {
	static componentName = "ProfileAvatar";

	protected template = template;

	private readonly controller: ProfileAvatarController;

	constructor(
		props: ProfileAvatarProps = {},
		controller = new ProfileAvatarController(new ProfileAvatarModel(props)),
	) {
		super(controller.getViewModel());
		this.controller = controller;
	}

	protected componentDidMount() {
		this.getAvatarInput()?.addEventListener(
			"change",
			this.handleAvatarChange,
		);
	}

	protected componentWillUnmount() {
		this.getAvatarInput()?.removeEventListener(
			"change",
			this.handleAvatarChange,
		);
	}

	private handleAvatarChange = async (event: Event) => {
		if (this.props.isLoading) {
			return;
		}

		const input = event.target;

		if (!(input instanceof HTMLInputElement)) {
			return;
		}

		const avatar = input.files?.[0];

		if (!avatar) {
			return;
		}

		this.setProps({
			isLoading: true,
			statusMessage: "",
		});

		const response = await this.controller.updateAvatar(avatar);

		if (typeof response === "string") {
			this.setProps({
				isLoading: false,
				statusMessage: response,
			});
			return;
		}

		const profileData = new ProfileModel(getUser()).getProfileData();

		this.setProps({
			avatar: profileData.avatar,
			isLoading: false,
			statusMessage: "Аватар обновлён",
		});
	};

	private getAvatarInput() {
		const avatarInput = this.refs.avatarInput;

		return avatarInput instanceof HTMLInputElement ? avatarInput : null;
	}
}

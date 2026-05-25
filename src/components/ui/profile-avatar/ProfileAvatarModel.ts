import type { ProfileAvatarProps } from "./types";

export class ProfileAvatarModel {
	private readonly props: ProfileAvatarProps;

	constructor(props: ProfileAvatarProps = {}) {
		this.props = props;
	}

	getAvatarData(): Required<ProfileAvatarProps> {
		return {
			action: this.props.action ?? "/profile",
			inputId: this.props.inputId ?? "profile-avatar",
			text: this.props.text ?? "Поменять аватар",
		};
	}
}

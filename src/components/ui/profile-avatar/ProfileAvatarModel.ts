import { ROUTES } from "@src/router/routes";
import type { ProfileAvatarProps } from "./types";

export class ProfileAvatarModel {
	private readonly props: ProfileAvatarProps;

	constructor(props: ProfileAvatarProps = {}) {
		this.props = props;
	}

	getAvatarData(): Required<ProfileAvatarProps> {
		return {
			action: this.props.action ?? ROUTES.settings,
			avatar: this.props.avatar ?? "",
			inputId: this.props.inputId ?? "profile-avatar",
			isLoading: this.props.isLoading ?? false,
			statusMessage: this.props.statusMessage ?? "",
			text: this.props.text ?? "Поменять аватар",
		};
	}
}

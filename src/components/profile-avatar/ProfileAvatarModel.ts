import { API_BASE_URL } from "@src/api";
import { ROUTES } from "@src/router";
import { sanitizeResourceUrl } from "@src/utils/security";
import type { ProfileAvatarProps } from "./types";

export class ProfileAvatarModel {
	private readonly props: ProfileAvatarProps;

	constructor(props: ProfileAvatarProps = {}) {
		this.props = props;
	}

	getAvatarData(): Required<ProfileAvatarProps> {
		return {
			action: this.props.action ?? ROUTES.settings,
			avatar: sanitizeResourceUrl(this.props.avatar, API_BASE_URL),
			inputId: this.props.inputId ?? "profile-avatar",
			isLoading: this.props.isLoading ?? false,
			statusMessage: this.props.statusMessage ?? "",
			text: this.props.text ?? "Поменять аватар",
		};
	}
}

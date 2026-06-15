import { PROFILE_EDIT_FORM_MODE } from "@src/components/profile-edit-form/types";
import { ROUTES } from "@src/router";
import type { ProfileLayoutProps } from "./types";

export class ProfileLayoutModel {
	private readonly props: ProfileLayoutProps;

	constructor(props: ProfileLayoutProps) {
		this.props = props;
	}

	getLayoutData(): ProfileLayoutProps {
		return {
			...this.props,
			backHref: this.props.backHref ?? ROUTES.messenger,
			dataEditFormMode: PROFILE_EDIT_FORM_MODE.edit,
			passwordEditFormMode: PROFILE_EDIT_FORM_MODE.password,
		};
	}
}

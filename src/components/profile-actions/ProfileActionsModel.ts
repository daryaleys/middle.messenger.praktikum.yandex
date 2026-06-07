import { ROUTES } from "@src/router/routes";
import type { ProfileActionsProps } from "./types";

const defaultActions: Required<ProfileActionsProps>["actions"] = [
	{
		href: ROUTES.settingsEdit,
		label: "Изменить данные",
	},
	{
		href: ROUTES.settingsPassword,
		label: "Изменить пароль",
	},
	{
		href: ROUTES.login,
		label: "Выйти",
		isDanger: true,
	},
];

export class ProfileActionsModel {
	private readonly props: ProfileActionsProps;

	constructor(props: ProfileActionsProps = {}) {
		this.props = props;
	}

	getActionsData(): Required<ProfileActionsProps> {
		return {
			actions: this.props.actions ?? defaultActions,
			errorMessage: this.props.errorMessage ?? "",
			isLoading: this.props.isLoading ?? false,
		};
	}
}

import type { ProfileActionsProps } from "./types";

const defaultActions: Required<ProfileActionsProps>["actions"] = [
	{
		href: "/profile/edit",
		label: "Изменить данные",
	},
	{
		href: "/profile/password",
		label: "Изменить пароль",
	},
	{
		href: "/login",
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
		};
	}
}

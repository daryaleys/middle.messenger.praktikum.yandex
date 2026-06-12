import { Block } from "@src/core";

import template from "./dialog-header.hbs?raw";
import { DIALOG_HEADER_ACTIONS, type DialogHeaderProps } from "./types";

export class DialogHeader extends Block<DialogHeaderProps> {
	static componentName = "DialogHeader";

	protected template = template;

	constructor(props: DialogHeaderProps) {
		super({
			...props,
			isUpdateAvatarModalOpen:
				props.isUpdateAvatarModalOpen ?? false,
			isUsersLoading: props.isUsersLoading ?? false,
			users: props.users ?? [],
			usersError: props.usersError ?? null,
		});
		this.events = {
			click: this.handleClick,
		};
	}

	private handleClick = (event: Event) => {
		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		const action = target.closest<HTMLElement>("[data-dropdown-action]");
		const actionName = action?.dataset.dropdownAction;

		if (
			actionName === DIALOG_HEADER_ACTIONS.updateAvatar ||
			target.closest("[data-update-chat-avatar-trigger]")
		) {
			this.props.onUpdateAvatar?.();
			return;
		}

		if (actionName === DIALOG_HEADER_ACTIONS.addUser) {
			this.props.onAddUser?.();
			return;
		}

		if (actionName === DIALOG_HEADER_ACTIONS.removeUser) {
			this.props.onRemoveUser?.();
		}
	};
}

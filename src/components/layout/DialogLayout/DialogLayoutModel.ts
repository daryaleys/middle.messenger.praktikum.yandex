import {
	CHAT_USER_ACTIONS,
	type DialogLayoutProps,
	type DialogLayoutViewModel,
} from "./types";
import type { DropdownConfig } from "@src/components/ui/dropdown/types";

const icons = {
	plusCircle:
		'<svg class="dropdown__item-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM232 344c0 13.3 10.7 24 24 24s24-10.7 24-24v-80h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-80v-80c0-13.3-10.7-24-24-24s-24 10.7-24 24v80h-80c-13.3 0-24 10.7-24 24s10.7 24 24 24h80v80z" /></svg>',
	xmarkCircle:
		'<svg class="dropdown__item-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>',
};

const chatActionsDropdown: DropdownConfig = {
	id: "chat-actions-dropdown",
	position: "top-right",
	items: [
		{
			id: CHAT_USER_ACTIONS.addUser,
			label: "Добавить пользователя",
			icon: icons.plusCircle,
		},
		{
			id: CHAT_USER_ACTIONS.removeUser,
			label: "Удалить пользователя",
			icon: icons.xmarkCircle,
		},
	],
};

const ADD_USER_MODAL_ID = "add-user-modal";
const REMOVE_USER_MODAL_ID = "remove-user-modal";

const addUserForm = {
	title: "Добавить пользователя",
	submitText: "Добавить",
} as const;

const removeUserForm = {
	title: "Удалить пользователя",
} as const;

export class DialogLayoutModel {
	private readonly props: DialogLayoutProps;

	constructor(props: DialogLayoutProps) {
		this.props = props;
	}

	getLayoutData(): DialogLayoutViewModel {
		return {
			chatActionsDropdown,
			addUserForm,
			addUserModalId: ADD_USER_MODAL_ID,
			removeUserForm,
			removeUserModalId: REMOVE_USER_MODAL_ID,
			...this.props,
		};
	}
}

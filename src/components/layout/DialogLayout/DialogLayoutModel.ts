import { DIALOG_HEADER_ACTIONS } from "./components/DialogHeader/types";
import type { DialogLayoutProps, DialogLayoutViewModel } from "./types";
import type { DropdownConfig } from "@src/components/ui/dropdown/types";

const icons = {
	camera:
		'<svg class="dropdown__item-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.5 7.6 6H5a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-2.6L15 4.5H9zm3 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z" /></svg>',
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
			id: DIALOG_HEADER_ACTIONS.updateAvatar,
			label: "Обновить аватар",
			icon: icons.camera,
		},
		{
			id: DIALOG_HEADER_ACTIONS.addUser,
			label: "Добавить пользователя",
			icon: icons.plusCircle,
		},
		{
			id: DIALOG_HEADER_ACTIONS.removeUser,
			label: "Удалить пользователя",
			icon: icons.xmarkCircle,
		},
	],
};

const UPDATE_CHAT_AVATAR_MODAL_ID = "update-chat-avatar-modal";
const ADD_USER_MODAL_ID = "add-user-modal";
const REMOVE_USER_MODAL_ID = "remove-user-modal";

const updateChatAvatarForm = {
	title: "Обновить аватар",
} as const;

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
			updateChatAvatarForm,
			updateChatAvatarModalId: UPDATE_CHAT_AVATAR_MODAL_ID,
			addUserForm,
			addUserModalId: ADD_USER_MODAL_ID,
			removeUserForm,
			removeUserModalId: REMOVE_USER_MODAL_ID,
			...this.props,
		};
	}
}

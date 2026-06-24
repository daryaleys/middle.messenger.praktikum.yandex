import { DIALOG_HEADER_ACTIONS } from "./components/DialogHeader/types";
import type { DialogLayoutProps, DialogLayoutViewModel } from "./types";
import type { DropdownConfig } from "@src/components/ui/dropdown/types";

const chatActionsDropdown: DropdownConfig = {
	id: "chat-actions-dropdown",
	position: "top-right",
	items: [
		{
			id: DIALOG_HEADER_ACTIONS.updateAvatar,
			label: "Обновить аватар",
			iconName: "camera",
		},
		{
			id: DIALOG_HEADER_ACTIONS.addUser,
			label: "Добавить пользователя",
			iconName: "plusCircle",
		},
		{
			id: DIALOG_HEADER_ACTIONS.removeUser,
			label: "Удалить пользователя",
			iconName: "xmarkCircle",
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

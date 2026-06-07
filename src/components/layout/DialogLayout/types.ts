import type { FormValues, ValidationErrors } from "@src/utils/validation";
import type { ChatUserFormConfig } from "@src/components/chat-user-form/types";
import type { DropdownConfig } from "@src/components/ui/dropdown/types";

export type DialogMessage = {
	id: number;
	author: string;
	time: string;
	isOwn: boolean;
	text?: string;
	imageUrl?: string;
	imageAlt?: string;
};

export type DialogUser = {
	id: number;
	name: string;
	role: string;
};

export type DialogData = {
	id: number;
	title: string;
	date: string;
	messages: DialogMessage[];
	users?: DialogUser[];
	usersError?: string | null;
	isUsersLoading?: boolean;
};

export type DialogLayoutProps = {
	activeChat: DialogData | null;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

export type DialogLayoutViewModel = DialogLayoutProps & {
	chatActionsDropdown: DropdownConfig;
	addUserForm: ChatUserFormConfig;
	addUserModalId: string;
	removeUserForm: ChatUserFormConfig;
	removeUserModalId: string;
	isAddUserModalOpen?: boolean;
	isRemoveUserModalOpen?: boolean;
	onAddUserModalClose?: () => void;
	onRemoveUserModalClose?: () => void;
};

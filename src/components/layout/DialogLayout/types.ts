import type { FormValues, ValidationErrors } from "@src/utils/validation";
import type { AddUserToChatFormConfig } from "@src/components/add-user-to-chat-form/types";
import type { RemoveUserFromChatFormConfig } from "@src/components/remove-user-from-chat-form/types";
import type { UpdateChatAvatarFormConfig } from "@src/components/update-chat-avatar-form/types";
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
	roleLabel: string;
};

export type DialogData = {
	id: number;
	title: string;
	avatarUrl?: string;
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
	addUserForm: AddUserToChatFormConfig;
	addUserModalId: string;
	removeUserForm: RemoveUserFromChatFormConfig;
	removeUserModalId: string;
	updateChatAvatarForm: UpdateChatAvatarFormConfig;
	updateChatAvatarModalId: string;
	isAddUserModalOpen?: boolean;
	isRemoveUserModalOpen?: boolean;
	isUpdateChatAvatarModalOpen?: boolean;
	onAddUserModalClose?: () => void;
	onAddUserModalOpen?: () => void;
	onRemoveUserModalClose?: () => void;
	onRemoveUserModalOpen?: () => void;
	onUpdateChatAvatarModalClose?: () => void;
	onUpdateChatAvatarModalOpen?: () => void;
};

import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";
import type { ChatUserFormProps } from "@src/components/chat-user-form/types";
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

export type DialogData = {
	title: string;
	date: string;
	messages: DialogMessage[];
};

export type DialogLayoutProps = {
	activeChat: DialogData | null;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

export type DialogLayoutViewModel = DialogLayoutProps & {
	addUserForm: ChatUserFormProps;
	chatActionsDropdown: DropdownConfig;
	isAddUserModalOpen?: boolean;
	isRemoveUserModalOpen?: boolean;
	onAddUserModalClose?: () => void;
	onRemoveUserModalClose?: () => void;
	removeUserForm: ChatUserFormProps;
};

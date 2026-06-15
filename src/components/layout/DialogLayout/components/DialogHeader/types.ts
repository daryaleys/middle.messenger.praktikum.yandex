import type { DropdownConfig } from "@src/components/ui/dropdown/types";

export const DIALOG_HEADER_ACTIONS = {
	updateAvatar: "update-avatar",
	addUser: "add-user",
	removeUser: "remove-user",
} as const;

export type DialogHeaderUser = {
	id: number;
	name: string;
	role: string;
	roleLabel: string;
};

export type DialogHeaderProps = {
	avatarUrl?: string;
	chatActionsDropdown: DropdownConfig;
	isUpdateAvatarModalOpen?: boolean;
	isUsersLoading?: boolean;
	onAddUser?: () => void;
	onRemoveUser?: () => void;
	onUpdateAvatar?: () => void;
	title: string;
	updateAvatarModalId: string;
	users?: DialogHeaderUser[];
	usersError?: string | null;
};

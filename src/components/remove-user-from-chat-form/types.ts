export type RemoveUserFromChatFormUser = {
	id: number;
	name: string;
	roleLabel: string;
};

export type RemoveUserFromChatFormProps = {
	chatId: number;
	error?: string | null;
	isLoading?: boolean;
	isUsersLoading?: boolean;
	onSuccess?: () => void;
	title: string;
	users?: RemoveUserFromChatFormUser[];
	usersError?: string | null;
};

export type RemoveUserFromChatFormConfig = Pick<
	RemoveUserFromChatFormProps,
	"title"
>;

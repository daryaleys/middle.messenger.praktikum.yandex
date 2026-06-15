export type UpdateChatAvatarFormProps = {
	avatarUrl?: string;
	chatId: number;
	error?: string | null;
	inputId?: string;
	isLoading?: boolean;
	onSuccess?: () => void;
	title: string;
};

export type UpdateChatAvatarFormConfig = Pick<
	UpdateChatAvatarFormProps,
	"title"
>;

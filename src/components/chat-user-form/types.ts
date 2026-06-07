import type { FormValues } from "@src/utils/validation";

export const CHAT_USER_FORM_ACTIONS = {
	addUser: "add-user",
	removeUser: "remove-user",
} as const;

export type ChatUserFormAction =
	(typeof CHAT_USER_FORM_ACTIONS)[keyof typeof CHAT_USER_FORM_ACTIONS];

export type ChatUserFormProps = {
	action: ChatUserFormAction;
	chatId: number;
	error?: string | null;
	formValues?: FormValues;
	isLoading?: boolean;
	onSuccess?: () => void;
	title: string;
	submitText: string;
};

export type ChatUserFormConfig = Pick<
	ChatUserFormProps,
	"action" | "title" | "submitText"
>;

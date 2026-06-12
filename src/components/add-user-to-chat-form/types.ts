import type { FormValues } from "@src/utils/validation";

export type AddUserToChatFormProps = {
	chatId: number;
	error?: string | null;
	formValues?: FormValues;
	isLoading?: boolean;
	onSuccess?: () => void;
	title: string;
	submitText: string;
};

export type AddUserToChatFormConfig = Pick<
	AddUserToChatFormProps,
	"title" | "submitText"
>;

import type { FormValues } from "@src/utils/validation";

export type CreateChatFormProps = {
	error?: string | null;
	formValues?: FormValues;
	isLoading?: boolean;
	onSuccess?: () => void;
	title: string;
	submitText: string;
};

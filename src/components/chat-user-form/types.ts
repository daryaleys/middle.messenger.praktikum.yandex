export type ChatUserFormAction = "add-user" | "remove-user";

export type ChatUserFormProps = {
	action: ChatUserFormAction;
	title: string;
	submitText: string;
};

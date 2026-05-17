import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";

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

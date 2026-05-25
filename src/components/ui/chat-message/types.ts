export type ChatMessageProps = {
	id: number;
	author: string;
	time: string;
	isOwn?: boolean;
	text?: string;
	imageUrl?: string;
	imageAlt?: string;
};

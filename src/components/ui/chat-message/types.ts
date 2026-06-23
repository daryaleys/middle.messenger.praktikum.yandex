export type ChatMessageProps = {
	id: number;
	author: string;
	time: string;
	timestamp?: number;
	isOwn?: boolean;
	deliveryStatus?: "sending" | "sent" | "failed";
	deliveryStatusLabel?: string;
	text?: string;
	imageUrl?: string;
	imageAlt?: string;
};

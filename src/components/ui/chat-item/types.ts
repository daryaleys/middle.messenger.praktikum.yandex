export type ChatItemLastMessage = {
	text: string;
	time: string;
};

export type ChatItemProps = {
	id: number;
	title: string;
	avatarUrl?: string;
	isActive?: boolean;
	lastMessage?: ChatItemLastMessage;
	unreadCount?: number;
};

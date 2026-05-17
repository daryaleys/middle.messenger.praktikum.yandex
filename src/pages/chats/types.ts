export type Chat = {
	id: number;
	title: string;
	avatarUrl: string;
	isActive?: boolean;
	unreadCount?: number;
	lastMessage: {
		author: string;
		text: string;
		time: string;
	};
	members: Array<{
		name: string;
		avatarUrl: string;
	}>;
};

export type Message = {
	id: number;
	author: string;
	time: string;
	isOwn: boolean;
	text?: string;
	imageUrl?: string;
	imageAlt?: string;
};

export type ActiveChat = {
	title: string;
	date: string;
	messages: Message[];
};

export type ChatsPageProps = {
	activeChat: ActiveChat;
	chats: Chat[];
};

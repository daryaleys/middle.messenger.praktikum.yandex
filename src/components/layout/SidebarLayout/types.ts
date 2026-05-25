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

export type SidebarLayoutProps = {
	chats: Chat[];
};

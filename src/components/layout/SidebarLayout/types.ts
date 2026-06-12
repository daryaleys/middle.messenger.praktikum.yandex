import type { CreateChatFormProps } from "@src/components/create-chat-form/types";

export type Chat = {
	id: number;
	title: string;
	avatarUrl?: string;
	isActive?: boolean;
	unreadCount?: number;
	lastMessage?: {
		author: string;
		text: string;
		time: string;
	};
	members?: Array<{
		name: string;
		avatarUrl: string;
	}>;
};

export type SidebarLayoutProps = {
	chats: Chat[];
	createChatModalId?: string;
	createChatForm?: CreateChatFormProps;
	deleteChatError?: string | null;
	deletingChatId?: number | null;
	isCreateChatModalOpen?: boolean;
	onCreateChatModalClose?: () => void;
	onCreateChatSuccess?: () => void;
	profileHref?: string;
};

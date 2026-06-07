export type ChatUser = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string | null;
	login: string;
	avatar: string | null;
	role: string;
};

export type LastMessageUser = {
	first_name: string;
	second_name: string;
	avatar: string | null;
	email: string;
	login: string;
	phone: string;
};

export type LastMessage = {
	user: LastMessageUser;
	time: string;
	content: string;
};

export type Chat = {
	id: number;
	title: string;
	avatar: string | null;
	unread_count: number;
	created_by: number;
	last_message: LastMessage | null;
};

export type ChatFile = {
	id: number;
	user_id: number;
	path: string;
	filename: string;
	content_type: string;
	content_size: number;
	upload_date: string;
};

export type ChatFileMessage = {
	id: number;
	user_id: number;
	chat_id: number;
	time: string;
	type: "file";
	content: number;
	file: ChatFile;
};

export type GetChatsRequest = {
	offset?: number;
	limit?: number;
	title?: string;
};

export type CreateChatRequest = {
	title: string;
};

export type CreateChatResponse = {
	id: number;
};

export type DeleteChatRequest = {
	chatId: number;
};

export type DeletedChat = {
	id: number;
	title: string;
	avatar: string | null;
	created_by: number;
};

export type DeleteChatResponse = {
	userId: number;
	result: DeletedChat;
};

export type ArchiveChatRequest = {
	chatId: number;
};

export type ArchiveChatResponse = {
	userId: number;
	result: Chat;
};

export type UnarchiveChatRequest = {
	chatId: number;
};

export type UnarchiveChatResponse = {
	userId: number;
	result: Chat;
};

export type ChatUsersRequest = {
	users: number[];
	chatId: number;
};

export type UploadChatAvatarRequest = {
	chatId: number;
	avatar: File;
};

export type GetChatUsersRequest = {
	offset?: number;
	limit?: number;
	name?: string;
	email?: string;
};

export type NewMessagesCountResponse = {
	unread_count: number;
};

export type ChatTokenResponse = {
	token: string;
};

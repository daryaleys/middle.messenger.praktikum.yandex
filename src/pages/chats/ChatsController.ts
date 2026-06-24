import {
	API_BASE_URL,
	deleteChatAPI,
	getChatNewMessagesCountAPI,
	getChatTokenAPI,
	getChatsAPI,
	getChatUsersAPI,
	uploadResourceAPI,
	type Chat as APIChat,
} from "@src/api";
import type { DialogMessage } from "@src/components/layout/DialogLayout/types";
import type { Chat } from "@src/components/layout/SidebarLayout/types";
import {
	ChatSocket,
	type ChatSocketMessage,
} from "@src/services/ws";
import { sanitizeResourceUrl } from "@src/utils/security";
import {
	addPendingChatMessage,
	addChatMessages,
	getSelectedChatId,
	getUser,
	markChatMessageFailed,
	removeFirstPendingChatMessage,
	setChatConnectionError,
	setChatUsers,
	setChatUsersError,
	setChatUsersLoading,
	setChats,
	setChatsError,
	setChatsLoading,
	removeChat,
	selectChat,
} from "@src/store";

import { ChatsModel } from "./ChatsModel";

export class ChatsController {
	private readonly model: ChatsModel;

	private chatSocket: ChatSocket | null = null;

	private chatConnectionRequestId = 0;

	constructor(model = new ChatsModel()) {
		this.model = model;
	}

	getViewModel() {
		return this.model.getPageData();
	}

	async loadChats() {
		setChatsLoading(true);

		try {
			const chats = await getChatsAPI.request();
			const mappedChats = chats.map((chat) => this.mapChatToView(chat));

			setChats(mappedChats);
			return mappedChats;
		} catch {
			const message = "Не удалось загрузить список чатов";

			setChatsError(message);
			return [];
		}
	}

	async openChat(chatId: number) {
		this.closeChatSocket();
		selectChat(chatId);
		setChatConnectionError(chatId, null);
		this.loadChatUsers(chatId);
		await this.openChatSocket(chatId);
	}

	closeChat() {
		this.closeChatSocket();
	}

	sendMessage(message: string) {
		const chatId = getSelectedChatId();
		const user = getUser();

		if (!chatId || !user) {
			return;
		}

		if (!this.chatSocket) {
			setChatConnectionError(
				chatId,
				"Нет соединения с чатом. Выберите чат ещё раз.",
			);
			return;
		}

		const pendingMessageId = this.createPendingMessageId();

		addPendingChatMessage(chatId, {
			id: pendingMessageId,
			author: user.login,
			time: this.formatMessageTime(new Date().toISOString()),
			timestamp: Date.now(),
			isOwn: true,
			deliveryStatus: "sending",
			deliveryStatusLabel: "Отправляется",
			text: message,
		});

		const isSent = this.chatSocket.sendMessage(message);

		if (!isSent) {
			markChatMessageFailed(chatId, pendingMessageId);
			setChatConnectionError(
				chatId,
				"Не удалось отправить сообщение. Соединение ещё не установлено.",
			);
		}
	}

	async sendFile(file: File) {
		const chatId = getSelectedChatId();
		const user = getUser();

		if (!chatId || !user) {
			return;
		}

		if (!this.chatSocket) {
			setChatConnectionError(
				chatId,
				"Нет соединения с чатом. Выберите чат ещё раз.",
			);
			return;
		}

		const pendingMessageId = this.createPendingMessageId();

		addPendingChatMessage(chatId, {
			id: pendingMessageId,
			author: user.login,
			time: this.formatMessageTime(new Date().toISOString()),
			timestamp: Date.now(),
			isOwn: true,
			deliveryStatus: "sending",
			deliveryStatusLabel: "Отправляется",
			text: file.name,
		});

		const formData = new FormData();
		formData.append("resource", file);

		try {
			const resource = await uploadResourceAPI.request(formData);
			const isSent = this.chatSocket?.sendFile(resource.id) ?? false;

			if (!isSent) {
				markChatMessageFailed(chatId, pendingMessageId);
				setChatConnectionError(
					chatId,
					"Файл загружен, но сообщение не отправлено. Соединение потеряно.",
				);
			}
		} catch {
			markChatMessageFailed(chatId, pendingMessageId);
			setChatConnectionError(
				chatId,
				"Не удалось загрузить файл. Проверьте соединение и попробуйте ещё раз.",
			);
		}
	}

	async loadChatUsers(chatId: number) {
		setChatUsersLoading(chatId, true);

		try {
			const users = await getChatUsersAPI.request({ id: chatId });

			setChatUsers(chatId, users);
		} catch {
			setChatUsersError(chatId, "Не удалось загрузить участников");
		}
	}

	async deleteChat(chatId: number) {
		try {
			const isDeletingSelectedChat = getSelectedChatId() === chatId;

			await deleteChatAPI.request({ chatId });
			removeChat(chatId);

			if (isDeletingSelectedChat) {
				this.closeChatSocket();
			}
		} catch {
			return "Не удалось удалить чат. Удалять чат может только администратор.";
		}
	}

	private async openChatSocket(chatId: number) {
		const user = getUser();
		const requestId = this.chatConnectionRequestId + 1;

		this.chatConnectionRequestId = requestId;

		if (!user) {
			return;
		}

		try {
			const [{ unread_count: unreadMessagesCount }, { token }] =
				await Promise.all([
					getChatNewMessagesCountAPI.request({ id: chatId }),
					getChatTokenAPI.request({ id: chatId }),
				]);
			let receivedUnreadMessagesCount = 0;

			if (this.chatConnectionRequestId !== requestId) {
				return;
			}

			this.chatSocket = new ChatSocket({
				userId: user.id,
				chatId,
				token,
				onClose: () => {
					setChatConnectionError(
						chatId,
						"Соединение с чатом закрыто. Выберите чат ещё раз.",
					);
				},
				onError: () => {
					setChatConnectionError(
						chatId,
						"Не удалось подключиться к чату. Попробуйте выбрать чат ещё раз.",
					);
				},
				onOpen: () => {
					setChatConnectionError(chatId, null);
					this.chatSocket?.getOldMessages(0);
				},
				onMessages: (messages) => {
					if (this.chatConnectionRequestId !== requestId) {
						return;
					}

					addChatMessages(
						chatId,
						messages.map((message) => {
							const viewMessage =
								this.mapSocketMessageToView(message, user.id);

							if (viewMessage.isOwn && viewMessage.text) {
								removeFirstPendingChatMessage(
									chatId,
									viewMessage.text,
								);
							}

							return viewMessage;
						}),
					);

					receivedUnreadMessagesCount += messages.length;

					if (
						receivedUnreadMessagesCount >= unreadMessagesCount ||
						messages.length === 0
					) {
						return;
					}

					const lastMessage = messages[messages.length - 1];

					if (lastMessage) {
						this.chatSocket?.getOldMessages(lastMessage.id);
					}
				},
			});
			this.chatSocket.connect();
		} catch {
			setChatConnectionError(
				chatId,
				"Не удалось подключиться к чату. Попробуйте выбрать чат ещё раз.",
			);
		}
	}

	private closeChatSocket() {
		this.chatConnectionRequestId += 1;
		this.chatSocket?.close();
		this.chatSocket = null;
	}

	private createPendingMessageId() {
		return -Date.now();
	}

	private mapSocketMessageToView(
		message: ChatSocketMessage,
		currentUserId: number,
	): DialogMessage {
		const date = new Date(message.time);
		const timestamp = Number.isNaN(date.getTime()) ? 0 : date.getTime();
		const file = message.file;
		const imageUrl = file?.content_type.startsWith("image/")
			? file.path
			: undefined;
		const imageAlt = imageUrl ? file?.filename : undefined;
		const isOwn = Number(message.user_id) === currentUserId;

		return {
			id: Number(message.id),
			author: String(message.user_id),
			time: this.formatMessageTime(message.time),
			timestamp,
			isOwn,
			deliveryStatus: isOwn ? "sent" : undefined,
			deliveryStatusLabel: isOwn ? "Отправлено" : undefined,
			text: file?.filename ?? message.content,
			imageUrl,
			imageAlt,
		};
	}

	private mapChatToView(chat: APIChat): Chat {
		return {
			id: chat.id,
			title: chat.title,
			avatarUrl: this.getAvatarUrl(chat.avatar),
			unreadCount: chat.unread_count,
			lastMessage: chat.last_message
				? {
						author: chat.last_message.user.login,
						text: chat.last_message.content,
						time: this.formatMessageTime(chat.last_message.time),
					}
				: undefined,
		};
	}

	private formatMessageTime(value: string) {
		const date = new Date(value);

		if (Number.isNaN(date.getTime())) {
			return "";
		}

		return new Intl.DateTimeFormat("ru-RU", {
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	}

	private getAvatarUrl(avatar?: string | null) {
		return sanitizeResourceUrl(avatar, API_BASE_URL);
	}
}

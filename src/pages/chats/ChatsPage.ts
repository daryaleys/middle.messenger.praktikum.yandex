import { Block } from "@src/core";
import {
	getChatsForView,
	getChatsError,
	isChatsLoading,
	store,
} from "@src/store";

import template from "./chats.hbs?raw";
import { ChatsController } from "./ChatsController";
import { mapActiveChatToView } from "./mapActiveChatToView";
import type { ChatsPageProps } from "./types";

export class ChatsPage extends Block<ChatsPageProps> {
	protected template = template;

	private readonly controller: ChatsController;

	private hasRequestedChats = false;

	private unsubscribeStore: (() => void) | null = null;

	private deletingChatId: number | null = null;

	constructor(controller = new ChatsController()) {
		const viewModel = controller.getViewModel();

		super(viewModel);
		this.controller = controller;
		this.props = {
			...this.props,
			onFileSubmit: this.handleFileSubmit,
			onMessageSubmit: this.handleMessageSubmit,
		};
		this.events = {
			click: this.handleClick,
		};
	}

	protected componentDidMount() {
		this.unsubscribeStore = store.subscribe(() => {
			this.setProps({
				activeChat: mapActiveChatToView(),
				chats: getChatsForView(),
				deletingChatId: this.deletingChatId,
				error: getChatsError(),
				isLoading: isChatsLoading(),
				onFileSubmit: this.handleFileSubmit,
				onMessageSubmit: this.handleMessageSubmit,
			});
		});

		if (this.hasRequestedChats) {
			return;
		}

		this.hasRequestedChats = true;
		this.loadChats();
	}

	protected componentWillUnmount() {
		this.unsubscribeStore?.();
	}

	protected componentWillDestroy() {
		this.controller.closeChat();
	}

	private async loadChats() {
		await this.controller.loadChats();
	}

	private handleClick = (event: Event) => {
		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		const chatItem = target.closest<HTMLElement>(".chat-item");
		const chatId = Number(chatItem?.dataset.id);

		if (!Number.isFinite(chatId)) {
			return;
		}

		const deleteButton = target.closest<HTMLElement>(
			"[data-delete-button-id]",
		);

		if (deleteButton) {
			event.preventDefault();
			this.handleDeleteChat(chatId);
			return;
		}

		if (this.deletingChatId === chatId) {
			return;
		}

		this.controller.openChat(chatId);
	};

	private handleMessageSubmit = (message: string) => {
		this.controller.sendMessage(message);
	};

	private handleFileSubmit = (file: File) => {
		this.controller.sendFile(file);
	};

	private async handleDeleteChat(chatId: number) {
		if (this.deletingChatId === chatId) {
			return;
		}

		this.deletingChatId = chatId;
		this.setProps({
			deleteChatError: null,
			deletingChatId: chatId,
		});

		const error = await this.controller.deleteChat(chatId);

		this.deletingChatId = null;

		if (error) {
			this.setProps({
				deleteChatError: error,
				deletingChatId: null,
			});
			return;
		}

		this.setProps({
			deletingChatId: null,
		});
	}
}

import { Block } from "@src/core";
import {
	getChatsForView,
	getChatsError,
	isChatsLoading,
	selectChat,
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

	constructor(controller = new ChatsController()) {
		const viewModel = controller.getViewModel();

		super(viewModel);
		this.controller = controller;
		this.events = {
			click: this.handleClick,
		};
	}

	protected componentDidMount() {
		this.unsubscribeStore = store.subscribe(() => {
			this.setProps({
				activeChat: mapActiveChatToView(),
				chats: getChatsForView(),
				error: getChatsError(),
				isLoading: isChatsLoading(),
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

	private async loadChats() {
		await this.controller.loadChats();
	}

	private handleClick = (event: Event) => {
		const target = event.target;

		if (!(target instanceof HTMLElement)) {
			return;
		}

		const chatItem = target.closest<HTMLElement>(".chat-item");
		const chatId = Number(chatItem?.dataset.id);

		if (!Number.isFinite(chatId)) {
			return;
		}

		selectChat(chatId);
		this.controller.loadChatUsers(chatId);
	};
}

import { activeChat, chats } from "./mock";
import type { ChatsPageProps } from "./types";

export class ChatsModel {
	getPageData(): ChatsPageProps {
		return {
			activeChat,
			chats,
		};
	}
}

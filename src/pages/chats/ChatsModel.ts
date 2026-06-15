import {
	getChatsForView,
	getChatsError,
	isChatsLoading,
} from "@src/store";
import { mapActiveChatToView } from "./mapActiveChatToView";
import type { ChatsPageProps } from "./types";

export class ChatsModel {
	getPageData(): ChatsPageProps {
		const chats = getChatsForView();
		const error = getChatsError();

		return {
			activeChat: mapActiveChatToView(),
			chats,
			error,
			isLoading: !error && (chats.length === 0 ? true : isChatsLoading()),
		};
	}
}

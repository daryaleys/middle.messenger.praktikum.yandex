import { API_BASE_URL } from "@src/api";
import { sanitizeResourceUrl } from "@src/utils/security";
import type { ChatItemProps } from "./types";

export class ChatItemModel {
	private readonly props: ChatItemProps;

	constructor(props: ChatItemProps) {
		this.props = props;
	}

	getItemData(): ChatItemProps {
		return {
			...this.props,
			avatarUrl: sanitizeResourceUrl(this.props.avatarUrl, API_BASE_URL),
		};
	}
}

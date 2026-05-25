import type { ChatItemProps } from "./types";

export class ChatItemModel {
	private readonly props: ChatItemProps;

	constructor(props: ChatItemProps) {
		this.props = props;
	}

	getItemData(): ChatItemProps {
		return this.props;
	}
}

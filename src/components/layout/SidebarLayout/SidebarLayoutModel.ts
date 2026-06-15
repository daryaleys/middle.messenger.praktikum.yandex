import { ROUTES } from "@src/router";
import type { CreateChatFormProps } from "@src/components/create-chat-form/types";
import type { SidebarLayoutProps } from "./types";

const createChatForm: CreateChatFormProps = {
	title: "Создать чат",
	submitText: "Создать",
};

const CREATE_CHAT_MODAL_ID = "create-chat-modal";

export class SidebarLayoutModel {
	private readonly props: SidebarLayoutProps;

	constructor(props: SidebarLayoutProps) {
		this.props = props;
	}

	getLayoutData(): SidebarLayoutProps {
		return {
			createChatForm,
			createChatModalId: CREATE_CHAT_MODAL_ID,
			...this.props,
			profileHref: this.props.profileHref ?? ROUTES.settings,
		};
	}
}

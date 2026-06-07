import { ROUTES } from "@src/router/routes";
import type { CreateChatFormProps } from "@src/components/create-chat-form/types";
import type { SidebarLayoutProps } from "./types";

const createChatForm: CreateChatFormProps = {
	title: "Создать чат",
	submitText: "Создать",
};

export class SidebarLayoutModel {
	private readonly props: SidebarLayoutProps;

	constructor(props: SidebarLayoutProps) {
		this.props = props;
	}

	getLayoutData(): SidebarLayoutProps {
		return {
			createChatForm,
			...this.props,
			profileHref: this.props.profileHref ?? ROUTES.settings,
		};
	}
}

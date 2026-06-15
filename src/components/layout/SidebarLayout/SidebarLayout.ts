import { Block } from "@src/core";

import template from "./sidebar-layout.hbs?raw";
import { SidebarLayoutController } from "./SidebarLayoutController";
import { SidebarLayoutModel } from "./SidebarLayoutModel";
import type { SidebarLayoutProps } from "./types";

export class SidebarLayout extends Block<SidebarLayoutProps> {
	static componentName = "SidebarLayout";

	protected template = template;

	constructor(
		props: SidebarLayoutProps,
		controller = new SidebarLayoutController(new SidebarLayoutModel(props)),
	) {
		super(controller.getViewModel());
		this.props = {
			...this.props,
			isCreateChatModalOpen: this.props.isCreateChatModalOpen ?? false,
			onCreateChatModalClose: this.handleCreateChatModalClose,
			onCreateChatSuccess: this.handleCreateChatSuccess,
		};
		this.events = {
			click: this.handleClick,
		};
	}

	private handleClick = (event: Event) => {
		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		if (!target.closest("[data-create-chat-trigger]")) {
			return;
		}

		event.preventDefault();
		this.setProps({
			isCreateChatModalOpen: true,
		});
	};

	private handleCreateChatModalClose = () => {
		this.setProps({
			isCreateChatModalOpen: false,
		});
	};

	private handleCreateChatSuccess = () => {
		this.handleCreateChatModalClose();
	};
}

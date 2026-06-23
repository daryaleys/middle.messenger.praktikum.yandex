import { Block } from "@src/core";

import template from "./dialog-layout.hbs?raw";
import { DialogLayoutController } from "./DialogLayoutController";
import { DialogLayoutModel } from "./DialogLayoutModel";
import type { DialogLayoutProps, DialogLayoutViewModel } from "./types";

export class DialogLayout extends Block<DialogLayoutViewModel> {
	static componentName = "DialogLayout";

	protected template = template;

	constructor(
		props: DialogLayoutProps,
		controller = new DialogLayoutController(new DialogLayoutModel(props)),
	) {
		super(controller.getViewModel());
		this.props = {
			...this.props,
			isUpdateChatAvatarModalOpen:
				this.props.isUpdateChatAvatarModalOpen ?? false,
			isAddUserModalOpen: this.props.isAddUserModalOpen ?? false,
			isRemoveUserModalOpen: this.props.isRemoveUserModalOpen ?? false,
			onUpdateChatAvatarModalClose: this.handleUpdateChatAvatarModalClose,
			onUpdateChatAvatarModalOpen: this.handleUpdateChatAvatarModalOpen,
			onAddUserModalClose: this.handleAddUserModalClose,
			onAddUserModalOpen: this.handleAddUserModalOpen,
			onRemoveUserModalClose: this.handleRemoveUserModalClose,
			onRemoveUserModalOpen: this.handleRemoveUserModalOpen,
		};
	}

	private handleUpdateChatAvatarModalOpen = () => {
		this.setProps({
			isUpdateChatAvatarModalOpen: true,
		});
	};

	private handleUpdateChatAvatarModalClose = () => {
		this.setProps({
			isUpdateChatAvatarModalOpen: false,
		});
	};

	private handleAddUserModalClose = () => {
		this.setProps({
			isAddUserModalOpen: false,
		});
	};

	private handleAddUserModalOpen = () => {
		this.setProps({
			isAddUserModalOpen: true,
		});
	};

	private handleRemoveUserModalClose = () => {
		this.setProps({
			isRemoveUserModalOpen: false,
		});
	};

	private handleRemoveUserModalOpen = () => {
		this.setProps({
			isRemoveUserModalOpen: true,
		});
	};
}

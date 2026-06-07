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
			isAddUserModalOpen: this.props.isAddUserModalOpen ?? false,
			isRemoveUserModalOpen:
				this.props.isRemoveUserModalOpen ?? false,
			onAddUserModalClose: this.handleAddUserModalClose,
			onRemoveUserModalClose: this.handleRemoveUserModalClose,
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

		const action = target.closest<HTMLElement>("[data-dropdown-action]");
		const actionName = action?.dataset.dropdownAction;

		if (actionName === "add-user") {
			this.setProps({
				isAddUserModalOpen: true,
			});
			return;
		}

		if (actionName === "remove-user") {
			this.setProps({
				isRemoveUserModalOpen: true,
			});
		}
	};

	private handleAddUserModalClose = () => {
		this.setProps({
			isAddUserModalOpen: false,
		});
	};

	private handleRemoveUserModalClose = () => {
		this.setProps({
			isRemoveUserModalOpen: false,
		});
	};
}

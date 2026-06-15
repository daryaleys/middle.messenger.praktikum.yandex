import { Block } from "@src/core";

import template from "./remove-user-from-chat-form.hbs?raw";
import { RemoveUserFromChatFormController } from "./RemoveUserFromChatFormController";
import { RemoveUserFromChatFormModel } from "./RemoveUserFromChatFormModel";
import type { RemoveUserFromChatFormProps } from "./types";

export class RemoveUserFromChatForm extends Block<RemoveUserFromChatFormProps> {
	static componentName = "RemoveUserFromChatForm";

	protected template = template;

	private readonly controller: RemoveUserFromChatFormController;

	constructor(
		props: RemoveUserFromChatFormProps,
		controller = new RemoveUserFromChatFormController(
			new RemoveUserFromChatFormModel(props),
		),
	) {
		super(controller.getViewModel());
		this.controller = controller;
		this.events = {
			click: this.handleClick,
		};
	}

	private handleClick = async (event: Event) => {
		if (this.props.isLoading) {
			return;
		}

		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		const button = target.closest<HTMLButtonElement>(
			"[data-delete-button-id]",
		);
		const userId = Number(button?.dataset.deleteButtonId);

		if (!Number.isFinite(userId)) {
			return;
		}

		this.setProps({
			error: null,
			isLoading: true,
		});

		const submitError = await this.controller.handleRemoveUserById(
			this.props.chatId,
			userId,
		);

		if (submitError) {
			this.setProps({
				error: submitError,
				isLoading: false,
			});
			return;
		}

		this.setProps({
			error: null,
			isLoading: false,
		});
		this.props.onSuccess?.();
	};
}

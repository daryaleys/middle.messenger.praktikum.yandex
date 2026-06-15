import { Block } from "@src/core";

import template from "./update-chat-avatar-form.hbs?raw";
import { UpdateChatAvatarFormController } from "./UpdateChatAvatarFormController";
import { UpdateChatAvatarFormModel } from "./UpdateChatAvatarFormModel";
import type { UpdateChatAvatarFormProps } from "./types";

export class UpdateChatAvatarForm extends Block<
	Required<UpdateChatAvatarFormProps>
> {
	static componentName = "UpdateChatAvatarForm";

	protected template = template;

	private readonly controller: UpdateChatAvatarFormController;

	constructor(
		props: UpdateChatAvatarFormProps,
		controller = new UpdateChatAvatarFormController(
			new UpdateChatAvatarFormModel(props),
		),
	) {
		super(controller.getViewModel());
		this.controller = controller;
	}

	protected componentDidMount() {
		this.getAvatarInput()?.addEventListener(
			"change",
			this.handleAvatarChange,
		);
	}

	protected componentWillUnmount() {
		this.getAvatarInput()?.removeEventListener(
			"change",
			this.handleAvatarChange,
		);
	}

	private handleAvatarChange = async (event: Event) => {
		if (this.props.isLoading) {
			return;
		}

		const input = event.target;

		if (!(input instanceof HTMLInputElement)) {
			return;
		}

		const avatar = input.files?.[0];

		if (!avatar) {
			return;
		}

		this.setProps({
			error: null,
			isLoading: true,
		});

		const result = await this.controller.updateAvatar(
			this.props.chatId,
			avatar,
		);

		if (typeof result === "string") {
			this.setProps({
				error: result,
				isLoading: false,
			});
			input.value = "";
			return;
		}

		this.props.onSuccess();
	};

	private getAvatarInput() {
		const avatarInput = this.refs.avatarInput;

		return avatarInput instanceof HTMLInputElement ? avatarInput : null;
	}
}

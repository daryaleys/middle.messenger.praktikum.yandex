import { Block } from "@src/core";
import {
	initFormValidation,
	type FormValues,
} from "@src/utils/validation";

import template from "./chat-user-form.hbs?raw";
import { ChatUserFormController } from "./ChatUserFormController";
import { ChatUserFormModel } from "./ChatUserFormModel";
import {
	CHAT_USER_FORM_ACTIONS,
	type ChatUserFormProps,
} from "./types";

export class ChatUserForm extends Block<ChatUserFormProps> {
	static componentName = "ChatUserForm";

	protected template = template;

	private readonly controller: ChatUserFormController;

	constructor(
		props: ChatUserFormProps,
		controller = new ChatUserFormController(new ChatUserFormModel(props)),
	) {
		super(controller.getViewModel());
		this.controller = controller;
	}

	protected componentDidMount() {
		const element = this.element();
		const form = element instanceof HTMLFormElement ? element : null;

		if (form) {
			initFormValidation(form, {
				onSubmit: (values) => this.handleSubmit(values),
			});
		}
	}

	private async handleSubmit(values: FormValues) {
		if (this.props.isLoading) {
			return;
		}

		const login = values.login?.trim();

		if (!login) {
			return;
		}

		this.setProps({
			error: null,
			formValues: values,
			isLoading: true,
		});

		const submitError =
			this.props.action === CHAT_USER_FORM_ACTIONS.addUser
				? await this.handleAddUser(login)
				: await this.handleRemoveUser(login);

		if (submitError) {
			this.setProps({
				error: submitError,
				formValues: values,
				isLoading: false,
			});
			return;
		}

		this.setProps({
			error: null,
			formValues: {},
			isLoading: false,
		});
		this.props.onSuccess?.();
	}

	private handleAddUser(login: string) {
		return this.controller.handleAddUser(this.props.chatId, login);
	}

	private handleRemoveUser(login: string) {
		return this.controller.handleRemoveUser(this.props.chatId, login);
	}
}

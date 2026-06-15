import { Block } from "@src/core";
import {
	initFormValidation,
	type FormValues,
} from "@src/utils/validation";

import template from "./add-user-to-chat-form.hbs?raw";
import { AddUserToChatFormController } from "./AddUserToChatFormController";
import { AddUserToChatFormModel } from "./AddUserToChatFormModel";
import type { AddUserToChatFormProps } from "./types";

export class AddUserToChatForm extends Block<AddUserToChatFormProps> {
	static componentName = "AddUserToChatForm";

	protected template = template;

	private readonly controller: AddUserToChatFormController;

	constructor(
		props: AddUserToChatFormProps,
		controller = new AddUserToChatFormController(
			new AddUserToChatFormModel(props),
		),
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

		const submitError = await this.controller.handleAddUser(
			this.props.chatId,
			login,
		);

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
}

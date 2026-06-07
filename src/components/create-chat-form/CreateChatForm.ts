import { Block } from "@src/core";
import { addChat } from "@src/store";
import { initFormValidation, type FormValues } from "@src/utils/validation";

import template from "./create-chat-form.hbs?raw";
import { CreateChatFormController } from "./CreateChatFormController";
import { CreateChatFormModel } from "./CreateChatFormModel";
import type { CreateChatFormProps } from "./types";

export class CreateChatForm extends Block<CreateChatFormProps> {
	static componentName = "CreateChatForm";

	protected template = template;

	private readonly controller: CreateChatFormController;

	constructor(
		props: CreateChatFormProps,
		controller = new CreateChatFormController(
			new CreateChatFormModel(props),
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

		const title = values.title?.trim();

		if (!title) {
			return;
		}

		this.setProps({
			error: null,
			formValues: values,
			isLoading: true,
		});

		try {
			const chat = await this.controller.createChat(title);

			this.setProps({
				error: null,
				formValues: {},
				isLoading: false,
			});

			this.props.onSuccess?.();

			addChat({
				id: chat.id,
				title,
			});
		} catch (error) {
			this.setProps({
				error: this.getErrorMessage(error),
				formValues: values,
				isLoading: false,
			});
		}
	}

	private getErrorMessage(error: unknown) {
		const fallback = "Не удалось создать чат";

		if (!error || typeof error !== "object") {
			return fallback;
		}

		const response = "response" in error ? error.response : null;

		if (typeof response !== "string" || response.length === 0) {
			return fallback;
		}

		try {
			const data = JSON.parse(response) as { reason?: string };

			return data.reason ?? fallback;
		} catch {
			return fallback;
		}
	}
}

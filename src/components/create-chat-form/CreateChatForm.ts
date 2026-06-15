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

		const result = await this.controller.createChat(title);

		if (typeof result === "string") {
			this.setProps({
				error: result,
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

		addChat({
			id: result.id,
			title,
		});
	}
}

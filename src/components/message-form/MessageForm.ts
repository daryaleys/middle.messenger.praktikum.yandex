import { Block } from "@src/core";
import { initFormValidation } from "@src/utils/validation";

import template from "./message-form.hbs?raw";
import { MessageFormController } from "./MessageFormController";
import { MessageFormModel } from "./MessageFormModel";
import type { MessageFormProps } from "./types";

export class MessageForm extends Block<MessageFormProps> {
	static componentName = "MessageForm";

	protected template = template;

	constructor(
		props: MessageFormProps,
		controller = new MessageFormController(new MessageFormModel(props)),
	) {
		super(controller.getViewModel());
		this.events = {
			change: this.handleChange,
			click: this.handleClick,
		};
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

	private handleSubmit(values: Record<string, string>) {
		const message = values.message?.trim();

		if (!message) {
			return;
		}

		this.props.onSubmit?.(message);

		const element = this.element();
		const form = element instanceof HTMLFormElement ? element : null;
		form?.reset();
	}

	private handleClick = (event: Event) => {
		const target = event.target;

		if (!(target instanceof Element)) {
			return;
		}

		const action = target.closest<HTMLElement>("[data-dropdown-action]");
		const actionId = action?.dataset.dropdownAction;

		if (actionId !== "attach-media" && actionId !== "attach-file") {
			return;
		}

		if (this.refs.fileInput instanceof HTMLInputElement) {
			this.refs.fileInput.click();
		}
	};

	private handleChange = (event: Event) => {
		const target = event.target;

		if (!(target instanceof HTMLInputElement) || target.type !== "file") {
			return;
		}

		const file = target.files?.[0];

		if (!file) {
			return;
		}

		this.props.onFileSubmit?.(file);
		target.value = "";
	};
}

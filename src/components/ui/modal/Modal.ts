import { Block } from "@src/core";

import template from "./modal.hbs?raw";
import { ModalController } from "./ModalController";
import { ModalModel } from "./ModalModel";
import type { ModalProps } from "./types";

export class Modal extends Block<ModalProps> {
	static componentName = "Modal";

	protected template = template;

	private readonly handleDocumentClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const trigger = target.closest(this.props.triggerSelector);

		if (trigger) {
			event.preventDefault();
			this.open();
			return;
		}

		if (this.props.isOpen && target.closest("[data-modal-close]")) {
			this.close();
		}
	};

	private readonly handleDocumentKeydown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			this.close();
		}
	};

	constructor(
		props: ModalProps,
		controller = new ModalController(new ModalModel(props)),
	) {
		super(controller.getViewModel());
	}

	protected componentDidMount() {
		document.addEventListener("click", this.handleDocumentClick);
		document.addEventListener("keydown", this.handleDocumentKeydown);
		this.syncTriggerState();
	}

	protected componentWillUnmount() {
		document.removeEventListener("click", this.handleDocumentClick);
		document.removeEventListener("keydown", this.handleDocumentKeydown);
	}

	private open() {
		this.setOpenState(true);
	}

	private close() {
		if (this.props.isOpen) {
			this.setOpenState(false);
		}
	}

	private setOpenState(isOpen: boolean) {
		const element = this.element();

		if (element instanceof HTMLElement) {
			element.hidden = !isOpen;
		}

		this.props.isOpen = isOpen;
		this.syncTriggerState(isOpen);
	}

	private syncTriggerState(isOpen = Boolean(this.props.isOpen)) {
		const trigger = document.querySelector<HTMLButtonElement>(
			`${this.props.triggerSelector}[aria-controls="${this.props.id}"]`,
		);

		if (trigger) {
			trigger.setAttribute("aria-expanded", String(isOpen));
		}
	}
}

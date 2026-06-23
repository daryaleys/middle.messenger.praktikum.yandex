import { Block } from "@src/core";

import template from "./dropdown.hbs?raw";
import { DropdownController } from "./DropdownController";
import { DropdownModel } from "./DropdownModel";
import type { DropdownProps } from "./types";

export class Dropdown extends Block<DropdownProps> {
	static componentName = "Dropdown";

	protected template = template;

	private readonly handleDocumentClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const trigger = this.findTrigger(target);
		const element = this.element();

		if (trigger) {
			this.toggleDropdown();
			return;
		}

		if (
			this.props.isOpen &&
			element &&
			!element.contains(event.target as Node)
		) {
			this.closeDropdown();
		}
	};

	private readonly handleDocumentKeydown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			this.closeDropdown();
		}
	};

	constructor(
		props: DropdownProps,
		controller = new DropdownController(new DropdownModel(props)),
	) {
		super(controller.getViewModel());

		this.events = {
			click: (event) => this.handleClick(event),
		};
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

	private handleClick(event: Event) {
		const target = event.target as HTMLElement;
		const action = target.closest<HTMLButtonElement>("[data-dropdown-action]");

		if (action) {
			this.closeDropdown();
		}
	}

	private toggleDropdown() {
		this.setOpenState(!this.props.isOpen);
	}

	private closeDropdown() {
		if (this.props.isOpen) {
			this.setOpenState(false);
		}
	}

	private setOpenState(isOpen: boolean) {
		this.setProps({ isOpen });
		this.syncTriggerState(isOpen);
	}

	private syncTriggerState(isOpen = Boolean(this.props.isOpen)) {
		const trigger = this.getTrigger();

		if (trigger) {
			trigger.setAttribute("aria-expanded", String(isOpen));
		}
	}

	private findTrigger(target: HTMLElement) {
		const { triggerSelector, id } = this.props;

		if (!triggerSelector) {
			return null;
		}

		const trigger = target.closest<HTMLButtonElement>(triggerSelector);

		if (!trigger || trigger.getAttribute("aria-controls") !== id) {
			return null;
		}

		return trigger;
	}

	private getTrigger() {
		const { triggerSelector, id } = this.props;

		if (!triggerSelector) {
			return null;
		}

		return document.querySelector<HTMLButtonElement>(
			`${triggerSelector}[aria-controls="${id}"]`,
		);
	}
}

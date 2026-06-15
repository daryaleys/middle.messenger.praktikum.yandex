import type { ModalProps } from "./types";

export class ModalModel {
	private readonly props: ModalProps;

	constructor(props: ModalProps) {
		this.props = props;
	}

	getModalData(): ModalProps {
		return {
			isOpen: false,
			...this.props,
		};
	}
}

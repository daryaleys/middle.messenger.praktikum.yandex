import { ModalModel } from "./ModalModel";
import type { ModalProps } from "./types";

export class ModalController {
	private readonly model: ModalModel;

	constructor(model: ModalModel) {
		this.model = model;
	}

	getViewModel(): ModalProps {
		return this.model.getModalData();
	}
}

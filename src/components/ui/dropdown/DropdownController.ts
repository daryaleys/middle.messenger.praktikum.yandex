import { DropdownModel } from "./DropdownModel";
import type { DropdownProps } from "./types";

export class DropdownController {
	private readonly model: DropdownModel;

	constructor(model: DropdownModel) {
		this.model = model;
	}

	getViewModel(): DropdownProps {
		return this.model.getDropdownData();
	}
}

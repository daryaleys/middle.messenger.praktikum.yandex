import { Block } from "@src/core";

import template from "./delete-button.hbs?raw";
import type { DeleteButtonProps } from "./types";

export class DeleteButton extends Block<DeleteButtonProps> {
	static componentName = "DeleteButton";

	protected template = template;
}

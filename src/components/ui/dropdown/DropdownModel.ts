import type { DropdownProps } from "./types";

export class DropdownModel {
	private readonly props: DropdownProps;

	constructor(props: DropdownProps) {
		this.props = props;
	}

	getDropdownData(): DropdownProps {
		const { config, ...props } = this.props;

		return {
			isOpen: false,
			position: "bottom-left",
			...config,
			...props,
		};
	}
}

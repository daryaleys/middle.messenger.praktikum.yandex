import type { InputProps } from "./types";

export class InputModel {
	private readonly props: InputProps;

	constructor(props: InputProps) {
		this.props = props;
	}

	getInputData(): InputProps {
		return {
			type: "text",
			...this.props,
		};
	}
}

import type { SubmitButtonProps } from "./types";

export class SubmitButtonModel {
	private readonly props: SubmitButtonProps;

	constructor(props: SubmitButtonProps = {}) {
		this.props = props;
	}

	getButtonData(): Required<SubmitButtonProps> {
		return {
			className: this.props.className ?? "",
			text: this.props.text ?? "Сохранить",
		};
	}
}

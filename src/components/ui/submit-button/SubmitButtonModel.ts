import type { SubmitButtonProps } from "./types";

export class SubmitButtonModel {
	private readonly props: SubmitButtonProps;

	constructor(props: SubmitButtonProps = {}) {
		this.props = props;
	}

	getButtonData(): Required<SubmitButtonProps> {
		return {
			className: this.props.className ?? "",
			disabled: this.props.disabled ?? false,
			isLoading: this.props.isLoading ?? false,
			loadingText: this.props.loadingText ?? "Загрузка...",
			text: this.props.text ?? "Сохранить",
		};
	}
}

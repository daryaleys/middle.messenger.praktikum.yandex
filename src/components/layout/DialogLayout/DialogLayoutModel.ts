import type { DialogLayoutProps } from "./types";

export class DialogLayoutModel {
	private readonly props: DialogLayoutProps;

	constructor(props: DialogLayoutProps) {
		this.props = props;
	}

	getLayoutData(): DialogLayoutProps {
		return this.props;
	}
}

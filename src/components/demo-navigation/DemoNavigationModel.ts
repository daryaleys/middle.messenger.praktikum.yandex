import type { DemoNavigationProps } from "./types";

export class DemoNavigationModel {
	private readonly props: DemoNavigationProps;

	constructor(props: DemoNavigationProps) {
		this.props = props;
	}

	getNavigationData(): DemoNavigationProps {
		return this.props;
	}
}

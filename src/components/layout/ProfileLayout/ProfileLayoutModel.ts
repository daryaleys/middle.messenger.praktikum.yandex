import type { ProfileLayoutProps } from "./types";

export class ProfileLayoutModel {
	private readonly props: ProfileLayoutProps;

	constructor(props: ProfileLayoutProps) {
		this.props = props;
	}

	getLayoutData(): ProfileLayoutProps {
		return this.props;
	}
}

import type { AuthLayoutProps } from "./types";

export class AuthLayoutModel {
	private readonly props: AuthLayoutProps;

	constructor(props: AuthLayoutProps) {
		this.props = props;
	}

	getLayoutData(): AuthLayoutProps {
		return this.props;
	}
}

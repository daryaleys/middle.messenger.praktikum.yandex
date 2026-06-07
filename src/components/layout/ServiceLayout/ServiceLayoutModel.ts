import { ROUTES } from "@src/router/routes";
import type { ServiceLayoutProps } from "./types";

export class ServiceLayoutModel {
	private readonly props: ServiceLayoutProps;

	constructor(props: ServiceLayoutProps) {
		this.props = props;
	}

	getLayoutData(): ServiceLayoutProps {
		return {
			...this.props,
			backHref: this.props.backHref ?? ROUTES.messenger,
		};
	}
}

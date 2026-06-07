import { ROUTES } from "@src/router/routes";
import type { SidebarLayoutProps } from "./types";

export class SidebarLayoutModel {
	private readonly props: SidebarLayoutProps;

	constructor(props: SidebarLayoutProps) {
		this.props = props;
	}

	getLayoutData(): SidebarLayoutProps {
		return {
			...this.props,
			profileHref: this.props.profileHref ?? ROUTES.settings,
		};
	}
}

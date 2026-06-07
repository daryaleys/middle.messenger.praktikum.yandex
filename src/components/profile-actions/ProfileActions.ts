import { Block } from "@src/core";

import template from "./profile-actions.hbs?raw";
import { ProfileActionsController } from "./ProfileActionsController";
import { ProfileActionsModel } from "./ProfileActionsModel";
import type { ProfileActionsProps } from "./types";

export class ProfileActions extends Block<Required<ProfileActionsProps>> {
	static componentName = "ProfileActions";

	protected template = template;

	private readonly controller: ProfileActionsController;

	constructor(
		props: ProfileActionsProps = {},
		controller = new ProfileActionsController(new ProfileActionsModel(props)),
	) {
		super(controller.getViewModel());
		this.controller = controller;
	}

	protected componentDidMount() {
		this.refs.logoutButton?.addEventListener(
			"click",
			this.handleLogoutClick,
		);
	}

	protected componentWillUnmount() {
		this.refs.logoutButton?.removeEventListener(
			"click",
			this.handleLogoutClick,
		);
	}

	private handleLogoutClick = async () => {
		if (this.props.isLoading) {
			return;
		}

		this.setProps({
			errorMessage: "",
			isLoading: true,
		});

		try {
			const errorMessage = await this.controller.logout();

			if (errorMessage) {
				this.setErrorMessage(errorMessage);
			}
		} finally {
			this.setLoading(false);
		}
	};

	private setErrorMessage(errorMessage: string) {
		this.setProps({
			errorMessage,
		});
	}

	private setLoading(isLoading: boolean) {
		this.setProps({
			isLoading,
		});
	}
}

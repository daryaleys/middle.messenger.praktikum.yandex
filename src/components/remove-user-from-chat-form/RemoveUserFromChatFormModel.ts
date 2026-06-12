import type { RemoveUserFromChatFormProps } from "./types";

export class RemoveUserFromChatFormModel {
	private readonly props: RemoveUserFromChatFormProps;

	constructor(props: RemoveUserFromChatFormProps) {
		this.props = props;
	}

	getFormData(): RemoveUserFromChatFormProps {
		return {
			...this.props,
			error: this.props.error ?? null,
			isLoading: this.props.isLoading ?? false,
			isUsersLoading: this.props.isUsersLoading ?? false,
			users: this.props.users ?? [],
			usersError: this.props.usersError ?? null,
		};
	}
}

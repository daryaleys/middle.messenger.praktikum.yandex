import type { UpdateChatAvatarFormProps } from "./types";

export class UpdateChatAvatarFormModel {
	private readonly props: UpdateChatAvatarFormProps;

	constructor(props: UpdateChatAvatarFormProps) {
		this.props = props;
	}

	getFormData(): Required<UpdateChatAvatarFormProps> {
		return {
			...this.props,
			avatarUrl: this.props.avatarUrl ?? "",
			error: this.props.error ?? null,
			inputId:
				this.props.inputId ?? `chat-avatar-${this.props.chatId}`,
			isLoading: this.props.isLoading ?? false,
			onSuccess: this.props.onSuccess ?? (() => {}),
		};
	}
}

import type { MessageFormProps } from "./types";
import type { DropdownConfig } from "@src/components/ui/dropdown/types";

const attachmentDropdown: DropdownConfig = {
	id: "attachment-dropdown",
	position: "bottom-left",
	items: [
		{
			id: "attach-media",
			label: "Фото или Видео",
			iconName: "image",
		},
		{
			id: "attach-file",
			label: "Файл",
			iconName: "file",
		},
		{
			id: "attach-location",
			label: "Локация",
			iconName: "location",
		},
	],
};

export class MessageFormModel {
	private readonly props: MessageFormProps;

	constructor(props: MessageFormProps) {
		this.props = props;
	}

	getFormData(): MessageFormProps {
		return {
			attachmentDropdown,
			...this.props,
		};
	}
}

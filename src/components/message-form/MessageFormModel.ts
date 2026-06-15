import type { MessageFormProps } from "./types";
import type { DropdownConfig } from "@src/components/ui/dropdown/types";

const icons = {
	image: '<svg class="dropdown__item-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M448 80v352H64V80h384zm0-48H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zM128 160a48 48 0 1 0 0 96 48 48 0 1 0 0-96zm32 224h288v-80l-72-72c-9.4-9.4-24.6-9.4-33.9 0L240 334.1l-40-40c-9.4-9.4-24.6-9.4-33.9 0L96 364.1V384h64z" /></svg>',
	file: '<svg class="dropdown__item-icon" viewBox="0 0 384 512" aria-hidden="true"><path d="M64 464h256V160h-96c-26.5 0-48-21.5-48-48V48H64v416zM224 0l160 160v304c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h176z" /></svg>',
	location: '<svg class="dropdown__item-icon" viewBox="0 0 384 512" aria-hidden="true"><path d="M215.7 499.2C267 435 384 279.4 384 192 384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2 12.3 15.3 35.1 15.3 47.4 0zM192 256a64 64 0 1 1 0-128 64 64 0 1 1 0 128z" /></svg>',
};

const attachmentDropdown: DropdownConfig = {
	id: "attachment-dropdown",
	position: "bottom-left",
	items: [
		{
			id: "attach-media",
			label: "Фото или Видео",
			icon: icons.image,
		},
		{
			id: "attach-file",
			label: "Файл",
			icon: icons.file,
		},
		{
			id: "attach-location",
			label: "Локация",
			icon: icons.location,
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

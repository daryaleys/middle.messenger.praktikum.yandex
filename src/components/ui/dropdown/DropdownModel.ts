import type { DropdownIconName, DropdownProps } from "./types";

const icons: Record<DropdownIconName, string> = {
	camera:
		'<svg class="dropdown__item-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.5 7.6 6H5a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-2.6L15 4.5H9zm3 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z" /></svg>',
	file: '<svg class="dropdown__item-icon" viewBox="0 0 384 512" aria-hidden="true"><path d="M64 464h256V160h-96c-26.5 0-48-21.5-48-48V48H64v416zM224 0l160 160v304c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h176z" /></svg>',
	image: '<svg class="dropdown__item-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M448 80v352H64V80h384zm0-48H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zM128 160a48 48 0 1 0 0 96 48 48 0 1 0 0-96zm32 224h288v-80l-72-72c-9.4-9.4-24.6-9.4-33.9 0L240 334.1l-40-40c-9.4-9.4-24.6-9.4-33.9 0L96 364.1V384h64z" /></svg>',
	location:
		'<svg class="dropdown__item-icon" viewBox="0 0 384 512" aria-hidden="true"><path d="M215.7 499.2C267 435 384 279.4 384 192 384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2 12.3 15.3 35.1 15.3 47.4 0zM192 256a64 64 0 1 1 0-128 64 64 0 1 1 0 128z" /></svg>',
	plusCircle:
		'<svg class="dropdown__item-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM232 344c0 13.3 10.7 24 24 24s24-10.7 24-24v-80h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-80v-80c0-13.3-10.7-24-24-24s-24 10.7-24 24v80h-80c-13.3 0-24 10.7-24 24s10.7 24 24 24h80v80z" /></svg>',
	xmarkCircle:
		'<svg class="dropdown__item-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>',
};

export class DropdownModel {
	private readonly props: DropdownProps;

	constructor(props: DropdownProps) {
		this.props = props;
	}

	getDropdownData(): DropdownProps {
		const { config, ...props } = this.props;
		const dropdownData = {
			isOpen: false,
			position: "bottom-left",
			...config,
			...props,
		} satisfies DropdownProps;

		return {
			...dropdownData,
			items: dropdownData.items?.map((item) => ({
				...item,
				icon: item.iconName ? icons[item.iconName] : "",
			})),
		};
	}
}

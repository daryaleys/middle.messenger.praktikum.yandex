export type DropdownIconName =
	| "camera"
	| "file"
	| "image"
	| "location"
	| "plusCircle"
	| "xmarkCircle";

export type DropdownItem = {
	id: string;
	label: string;
	icon?: string;
	iconName?: DropdownIconName;
};

export type DropdownPosition = "top-right" | "bottom-left";

export type DropdownConfig = {
	id: string;
	position?: DropdownPosition;
	items: DropdownItem[];
};

export type DropdownProps = Partial<DropdownConfig> & {
	config?: DropdownConfig;
	isOpen?: boolean;
	triggerSelector?: string;
};

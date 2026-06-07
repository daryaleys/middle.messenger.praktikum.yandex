export type ModalProps = {
	id: string;
	label: string;
	children?: string;
	isOpen?: boolean;
	onClose?: () => void;
};

import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";
import type { DropdownConfig } from "@src/components/ui/dropdown/types";

export type MessageFormProps = {
	attachmentDropdown?: DropdownConfig;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
	onFileSubmit?: (file: File) => void;
	onSubmit?: (message: string) => void;
};

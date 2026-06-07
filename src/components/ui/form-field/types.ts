import type {
	ValidationErrors,
	ValidationRuleName,
} from "@src/utils/validation";

export type FormFieldProps = {
	label: string;
	name: string;
	type: string;
	error?: string;
	value?: string;
	validationRule?: ValidationRuleName;
	formErrors?: ValidationErrors;
};

export type FormFieldViewProps = FormFieldProps & {
	errorId: string;
	errorMessage: string;
	inputId: string;
	isInvalid: boolean;
};

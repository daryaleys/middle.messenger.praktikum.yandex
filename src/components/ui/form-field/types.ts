import type {
	FormValues,
	ValidationErrors,
	ValidationRuleName,
} from "@src/utils/validation";

export type FormFieldProps = {
	label: string;
	name: string;
	type: string;
	error?: string;
	validationRule?: ValidationRuleName;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

export type FormFieldViewProps = FormFieldProps & {
	errorId: string;
	errorMessage: string;
	inputId: string;
	isInvalid: boolean;
};

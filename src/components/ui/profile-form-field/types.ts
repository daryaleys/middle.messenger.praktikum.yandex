import type {
	FormValues,
	ValidationErrors,
	ValidationRuleName,
} from "@src/utils/validation";

export type ProfileFormFieldProps = {
	label: string;
	name: string;
	type: string;
	value?: string;
	error?: string;
	validationRule?: ValidationRuleName;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

export type ProfileFormFieldViewProps = ProfileFormFieldProps & {
	errorId: string;
	errorMessage: string;
	inputId: string;
	inputValue: string;
	isInvalid: boolean;
};

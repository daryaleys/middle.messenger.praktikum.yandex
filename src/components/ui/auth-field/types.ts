import type {
	FormValues,
	ValidationErrors,
	ValidationRuleName,
} from "@src/utils/validation";

export type AuthFieldProps = {
	label: string;
	name: string;
	type: string;
	error?: string;
	validationRule?: ValidationRuleName;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

export type AuthFieldViewProps = AuthFieldProps & {
	errorId: string;
	errorMessage: string;
	inputId: string;
	isInvalid: boolean;
};

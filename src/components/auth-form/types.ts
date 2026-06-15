import type { FormFieldProps } from "@src/components/ui/form-field/types";
import type { FormValues, ValidationErrors } from "@src/utils/validation";

export type AuthFormProps = {
	fieldsModifier: string;
	linkHref: string;
	linkText: string;
	submitText: string;
	fields: FormFieldProps[];
	formErrors?: ValidationErrors;
	formValues?: FormValues;
	isLoading?: boolean;
	submitError?: string;
};

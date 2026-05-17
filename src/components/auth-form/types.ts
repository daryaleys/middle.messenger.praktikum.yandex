import type { AuthFieldProps } from "@src/components/ui/auth-field/types";
import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";

export type AuthFormProps = {
	fieldsModifier: string;
	linkHref: string;
	linkText: string;
	submitText: string;
	fields: AuthFieldProps[];
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

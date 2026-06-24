import type { InlineFormFieldProps } from "@src/components/ui/inline-form-field/types";
import type { FormValues, ValidationErrors } from "@src/utils/validation";

export const PROFILE_EDIT_FORM_MODE = {
	edit: "edit",
	password: "password",
} as const;

export type ProfileEditFormMode =
	(typeof PROFILE_EDIT_FORM_MODE)[keyof typeof PROFILE_EDIT_FORM_MODE];

export type ProfileEditFormProps = {
	fields: InlineFormFieldProps[];
	mode?: ProfileEditFormMode;
	submitText?: string;
	submitError?: string;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
	isLoading?: boolean;
};

import type { ProfileFormFieldProps } from "@src/components/ui/profile-form-field/types";
import type { FormValues, ValidationErrors } from "@src/utils/validation";

export type ProfileEditFormProps = {
	fields: ProfileFormFieldProps[];
	submitText?: string;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

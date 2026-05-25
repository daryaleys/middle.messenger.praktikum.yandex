import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";

export type MessageFormProps = {
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

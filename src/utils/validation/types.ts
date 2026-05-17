export type ValidationRuleName =
	| "first_name"
	| "second_name"
	| "login"
	| "email"
	| "password"
	| "password_repeat"
	| "phone"
	| "message";

export type ValidationContext = {
	form: HTMLFormElement;
	input: HTMLInputElement;
};

export type ValidationRule = {
	message: string;
	pattern?: RegExp;
	validate?(value: string, context: ValidationContext): boolean;
};

export type ValidationErrors = Partial<Record<ValidationRuleName | string, string>>;
export type FormValues = Record<string, string>;

export type FormValidationState = {
	formErrors: ValidationErrors;
	formValues: FormValues;
};

export type FormValidationOptions = {
	onValidate(state: FormValidationState): void;
	onSubmit(values: FormValues): void;
};

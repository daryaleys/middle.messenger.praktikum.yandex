import type { ValidationRuleName } from "@src/utils/validation";

export type InputProps = {
	accept?: string;
	autocomplete?: string;
	className?: string;
	describedBy?: string;
	disabled?: boolean;
	id?: string;
	isInvalid?: boolean;
	maxlength?: string;
	minlength?: string;
	name?: string;
	placeholder?: string;
	readonly?: boolean;
	required?: boolean;
	type?: string;
	validationRule?: ValidationRuleName;
	value?: string;
};

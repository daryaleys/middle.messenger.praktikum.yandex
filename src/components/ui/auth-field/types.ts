import type { ValidationRuleName } from "@src/utils/validation";

export type AuthFieldProps = {
	label: string;
	name: string;
	type: string;
	error?: string;
	validationRule?: ValidationRuleName;
};

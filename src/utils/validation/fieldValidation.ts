import { validationRules } from "./validationRules";
import type { ValidationRuleName } from "./types";

function isValidationRuleName(ruleName: string): ruleName is ValidationRuleName {
	return ruleName in validationRules;
}

function getRuleName(input: HTMLInputElement): ValidationRuleName | null {
	const ruleName = input.dataset.validationRule ?? input.name;

	if (isValidationRuleName(ruleName)) {
		return ruleName;
	}

	return null;
}

export function getErrorName(input: HTMLInputElement): string {
	return input.name;
}

export function validateInputValue(
	input: HTMLInputElement,
	form: HTMLFormElement,
): string {
	const ruleName = getRuleName(input);

	if (!ruleName) {
		return "";
	}

	const rule = validationRules[ruleName];
	const value = input.value.trim();
	const isValidByPattern = rule.pattern ? rule.pattern.test(value) : true;
	const isValidByValidator = rule.validate
		? rule.validate(value, { form, input })
		: true;

	return isValidByPattern && isValidByValidator ? "" : rule.message;
}

export function hasValidationRule(input: HTMLInputElement): boolean {
	return Boolean(getRuleName(input));
}

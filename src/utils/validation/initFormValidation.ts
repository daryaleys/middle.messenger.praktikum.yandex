import { collectFormData, getFilledFormData } from "./formData";
import {
	getErrorName,
	hasValidationRule,
	validateInputValue,
} from "./fieldValidation";
import type { FormValidationOptions, ValidationErrors } from "./types";

const VALIDATION_FIELD_SELECTOR = "[data-validation-field]";
const VALIDATION_ERROR_SELECTOR = "[data-validation-error]";

function getValidationField(input: HTMLInputElement): HTMLElement | null {
	return input.closest<HTMLElement>(VALIDATION_FIELD_SELECTOR);
}

function getErrorElement(field: HTMLElement): HTMLElement | null {
	return field.querySelector<HTMLElement>(VALIDATION_ERROR_SELECTOR);
}

function renderInputError(input: HTMLInputElement, errorMessage: string) {
	const field = getValidationField(input);
	const errorElement = field ? getErrorElement(field) : null;
	const errorId = errorElement?.id;

	if (!field || !errorElement || !errorId) {
		return;
	}

	if (!errorMessage) {
		field.dataset.validationState = "valid";
		input.removeAttribute("aria-invalid");
		input.removeAttribute("aria-describedby");
		errorElement.hidden = true;
		errorElement.textContent = "";
		return;
	}

	field.dataset.validationState = "invalid";
	input.setAttribute("aria-invalid", "true");
	input.setAttribute("aria-describedby", errorId);
	errorElement.hidden = false;
	errorElement.textContent = errorMessage;
}

export function initFormValidation(
	form: HTMLFormElement,
	{ onSubmit }: FormValidationOptions,
) {
	let formErrors: ValidationErrors = {};

	form.addEventListener(
		"blur",
		(event) => {
			if (!(event.target instanceof HTMLInputElement)) {
				return;
			}

			const errorName = getErrorName(event.target);
			const errorMessage = validateInputValue(event.target, form);
			formErrors = {
				...formErrors,
				[errorName]: errorMessage,
			};

			if (!errorMessage) {
				delete formErrors[errorName];
			}

			renderInputError(event.target, errorMessage);
		},
		true,
	);

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const inputs = Array.from(form.elements).filter(
			(element): element is HTMLInputElement =>
				element instanceof HTMLInputElement &&
				hasValidationRule(element),
		);

		formErrors = inputs.reduce<ValidationErrors>((errors, input) => {
			const errorMessage = validateInputValue(input, form);
			renderInputError(input, errorMessage);

			if (errorMessage) {
				errors[getErrorName(input)] = errorMessage;
			}

			return errors;
		}, {});

		if (Object.keys(formErrors).length === 0) {
			const formValues = collectFormData(form);
			const filledFormValues = getFilledFormData(formValues);
			onSubmit(filledFormValues);
		}
	});
}

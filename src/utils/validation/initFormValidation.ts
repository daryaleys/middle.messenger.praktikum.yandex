import { collectFormData, getFilledFormData } from "./formData";
import {
	getErrorName,
	hasValidationRule,
	validateInputValue,
} from "./fieldValidation";
import type {
	FormValidationOptions,
	ValidationErrors,
} from "./types";

export function initFormValidation(
	form: HTMLFormElement,
	{ onValidate, onSubmit }: FormValidationOptions,
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

			onValidate({
				formErrors,
				formValues: collectFormData(form),
			});
		},
		true,
	);

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const inputs = Array.from(form.elements).filter(
			(element): element is HTMLInputElement =>
				element instanceof HTMLInputElement && hasValidationRule(element),
		);

		formErrors = inputs.reduce<ValidationErrors>((errors, input) => {
			const errorMessage = validateInputValue(input, form);

			if (errorMessage) {
				errors[getErrorName(input)] = errorMessage;
			}

			return errors;
		}, {});

		const formValues = collectFormData(form);

		onValidate({
			formErrors,
			formValues,
		});

		if (Object.keys(formErrors).length === 0) {
			const filledFormValues = getFilledFormData(formValues);
			onSubmit(filledFormValues);
		}
	});
}

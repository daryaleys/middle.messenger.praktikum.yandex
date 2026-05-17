import type { FormValues } from "./types";

export function collectFormData(form: HTMLFormElement): FormValues {
	return Object.fromEntries(new FormData(form).entries()) as FormValues;
}

export function getFilledFormData(values: FormValues): FormValues {
	return Object.fromEntries(
		Object.entries(values).filter(([, value]) => value.trim() !== ""),
	);
}

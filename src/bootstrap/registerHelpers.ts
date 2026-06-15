import Handlebars from "handlebars";
import { isEqual } from "@src/utils/object";

export function registerHelpers() {
	// Возвращает текст ошибки поля по его name из общего объекта ошибок формы
	Handlebars.registerHelper(
		"fieldError",
		(errors: Record<string, string> | undefined, name: string) =>
			errors?.[name] ?? "",
	);
	// Возвращает актуальное значение поля или исходное значение
	Handlebars.registerHelper(
		"fieldValue",
		(
			values: Record<string, string> | undefined,
			name: string,
			defaultValue?: unknown,
		) => {
			const fallback =
				typeof defaultValue === "string" ? defaultValue : "";

			return values?.[name] ?? fallback;
		},
	);
	Handlebars.registerHelper("isEqual", (lhs: unknown, rhs: unknown) =>
		isEqual(lhs, rhs),
	);
}

import Handlebars from "handlebars";

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
}

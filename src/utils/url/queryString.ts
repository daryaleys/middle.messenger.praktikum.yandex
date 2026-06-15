export function queryStringify(data: Record<string, unknown>): string {
	if (typeof data !== "object" || data === null) {
		throw new Error("Data must be a non-null object");
	}

	const keys = Object.keys(data);

	if (keys.length === 0) {
		return "";
	}

	return keys.reduce((result, key, index) => {
		const value = data[key];

		if (
			value === undefined ||
			value === null ||
			value === "" ||
			typeof value !== "string" &&
			typeof value !== "number" &&
			typeof value !== "boolean"
		) {
			return result;
		}

		const encodedKey = encodeURIComponent(key);
		const encodedValue = encodeURIComponent(value);

		const separator = index < keys.length - 1 ? "&" : "";

		return `${result}${encodedKey}=${encodedValue}${separator}`;
	}, "?");
}

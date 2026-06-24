export function sanitizeResourceUrl(
	value: string | null | undefined,
	apiBaseUrl: string,
) {
	if (!value) {
		return "";
	}

	if (value.startsWith("/")) {
		return `${apiBaseUrl}/resources${value}`;
	}

	try {
		const url = new URL(value);
		const apiUrl = new URL(apiBaseUrl);
		const resourcesPath = `${apiUrl.pathname}/resources/`;

		if (url.origin === apiUrl.origin && url.pathname.startsWith(resourcesPath)) {
			return url.href;
		}
	} catch {
		return "";
	}

	return "";
}

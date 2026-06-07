type Indexed = {
	[key in string]: unknown;
};

export function set(
	object: Indexed,
	path: string,
	value: unknown,
): Indexed {
	if (!path) {
		return object;
	}

	const result: Indexed = { ...object };
	const keys = path.split(".");
	let current = result;

	keys.forEach((key, index) => {
		if (index === keys.length - 1) {
			current[key] = value;
			return;
		}

		const nextValue = current[key];
		const nextObject =
			typeof nextValue === "object" && nextValue !== null
				? { ...(nextValue as Indexed) }
				: {};

		current[key] = nextObject;
		current = nextObject;
	});

	return result;
}

import { isPlainObject } from "./isPlainObject";

type Indexed = {
	[key in string]: unknown;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
	const result: Indexed = { ...lhs };

	Object.entries(rhs).forEach(([key, value]) => {
		const currentValue = result[key];

		if (isPlainObject(currentValue) && isPlainObject(value)) {
			result[key] = merge(currentValue, value);
			return;
		}

		result[key] = value;
	});

	return result;
}

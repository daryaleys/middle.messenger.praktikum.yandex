import { isPlainObject } from "./isPlainObject";

export function isEqual(lhs: unknown, rhs: unknown): boolean {
	if (Object.is(lhs, rhs)) {
		return true;
	}

	if (Array.isArray(lhs) || Array.isArray(rhs)) {
		if (!Array.isArray(lhs) || !Array.isArray(rhs)) {
			return false;
		}

		return (
			lhs.length === rhs.length &&
			lhs.every((item, index) => isEqual(item, rhs[index]))
		);
	}

	if (isPlainObject(lhs) || isPlainObject(rhs)) {
		if (!isPlainObject(lhs) || !isPlainObject(rhs)) {
			return false;
		}

		const lhsKeys = Object.keys(lhs);
		const rhsKeys = Object.keys(rhs);

		return (
			lhsKeys.length === rhsKeys.length &&
			lhsKeys.every((key) => isEqual(lhs[key], rhs[key]))
		);
	}

	return false;
}

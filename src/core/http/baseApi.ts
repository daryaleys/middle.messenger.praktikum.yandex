export class BaseAPI {
	create(...args: unknown[]): unknown {
		throw new Error(`Not implemented${args.length ? "" : ""}`);
	}

	request(...args: unknown[]): unknown {
		throw new Error(`Not implemented${args.length ? "" : ""}`);
	}

	update(...args: unknown[]): unknown {
		throw new Error(`Not implemented${args.length ? "" : ""}`);
	}

	delete(...args: unknown[]): unknown {
		throw new Error(`Not implemented${args.length ? "" : ""}`);
	}
}

export default BaseAPI;

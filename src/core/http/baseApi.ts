export class BaseAPI {
	create(..._args: unknown[]): unknown {
		throw new Error("Not implemented");
	}

	request(..._args: unknown[]): unknown {
		throw new Error("Not implemented");
	}

	update(..._args: unknown[]): unknown {
		throw new Error("Not implemented");
	}

	delete(..._args: unknown[]): unknown {
		throw new Error("Not implemented");
	}
}

export default BaseAPI;

import { merge } from "@src/utils/object";

type Indexed = {
	[key in string]: unknown;
};

type StoreListener = () => void;

export class Store {
	private state: Indexed = {};

	private listeners: Set<StoreListener> = new Set();

	public getState(): Indexed {
		return this.state;
	}

	public setState(nextState: Indexed) {
		this.state = merge(this.state, nextState);
		this.emit();
	}

	public subscribe(listener: StoreListener): () => void {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	}

	private emit() {
		this.listeners.forEach((listener) => {
			listener();
		});
	}
}
export default Store;

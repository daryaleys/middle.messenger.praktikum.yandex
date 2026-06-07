import type Block from "../block/block";

type BlockFactory = () => Block<object>;

type RouteProps = {
	rootQuery: string;
};

export class Route {
	private _pathname: string;
	private _blockFactory: BlockFactory;
	private _block: Block<object> | null = null;
	private _props: RouteProps;

	constructor(pathname: string, view: BlockFactory, props: RouteProps) {
		this._pathname = pathname;
		this._blockFactory = view;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.element()?.remove();
		}
	}

	match(pathname: string) {
		return pathname === this._pathname;
	}

	render() {
		if (!this._block) {
			this._block = this._blockFactory();
		}

		this.renderBlock();
	}

	private renderBlock() {
		if (!this._block) {
			return;
		}

		const root = document.querySelector(this._props.rootQuery);

		if (!root) {
			throw new Error(
				`Root element "${this._props.rootQuery}" not found`,
			);
		}

		const element = this._block.element();

		if (element) {
			root.replaceChildren(element);
		}
	}
}

export default Route;

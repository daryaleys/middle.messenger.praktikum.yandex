import Handlebars from "handlebars";

type EventType = keyof HTMLElementEventMap;
type EventHandler = (e: Event) => void;

type EventListType = {
	[K in EventType]?: EventHandler;
} & {
	[eventName: string]: EventHandler | undefined;
};

export interface BlockOwnProps {
	__children?: Array<{
		component: Block<object>;
		embed(node: DocumentFragment): void;
	}>;
	__refs?: Record<string, Element>;
}

export type BlockComponent<Props extends object = object> = {
	componentName: string;
	new (props: Props): Block<Props>;
};

export default abstract class Block<Props extends object = object> {
	protected abstract template: string;

	protected props: Props & BlockOwnProps;

	private domElement: Element | null = null;

	protected children: Block<object>[] = [];

	protected refs: Record<string, Element> = {};

	protected events: EventListType = {};

	constructor(props?: Props) {
		this.props = Object.assign({}, props, {
			__children: [],
			__refs: {},
		});
	}

	public element(): Element | null {
		if (!this.domElement) {
			this.render();
		}
		return this.domElement;
	}

	public setProps(props: Partial<Props>) {
		this.props = {
			...this.props,
			...props,
			__children: [],
			__refs: {},
		};
		this.render();
	}

	protected componentDidMount() {}

	private mountComponent() {
		this.attachListeners();
		this.componentDidMount();
	}

	protected componentWillUnmount() {}

	private unmountComponent() {
		if (this.domElement) {
			this.children
				.reverse()
				.forEach((child) => child.unmountComponent());

			this.componentWillUnmount();
			this.removeListeners();
		}
	}

	private attachListeners() {
		for (const eventName in this.events) {
			const eventCallback = this.events[eventName];
			if (typeof eventCallback == "function" && this.domElement) {
				this.domElement.addEventListener(eventName, eventCallback);
			}
		}
	}

	private removeListeners() {
		for (const eventName in this.events) {
			const eventCallback = this.events[eventName];
			if (typeof eventCallback === "function" && this.domElement) {
				this.domElement.removeEventListener(eventName, eventCallback);
			}
		}
	}

	protected render() {
		this.unmountComponent();
		const fragment = this.compile();
		if (this.domElement && fragment) {
			this.domElement.replaceWith(fragment);
		}
		this.domElement = fragment;
		this.mountComponent();
	}

	private compile(): Element | null {
		const html = Handlebars.compile(this.template)(this.props);
		const templateElement = document.createElement("template");
		templateElement.innerHTML = html;
		const fragment = templateElement.content;

		if (this.props.__children) {
			this.children = this.props.__children.map(
				(child) => child.component,
			);

			this.props.__children.forEach((child) => {
				child.embed(fragment);
			});
		}

		const defaultRefs = this.props?.__refs ?? {};
		this.refs = Array.from(fragment.querySelectorAll("[ref]")).reduce(
			(list, element) => {
				const key = element.getAttribute("ref") as string;
				list[key] = element as HTMLElement;
				element.removeAttribute("ref");
				return list;
			},
			defaultRefs,
		);

		return templateElement.content.firstElementChild;
	}
}

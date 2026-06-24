import { beforeEach, describe, expect, it, vi } from "vitest";
import Block from "./block";
import { registerComponent } from "./registerComponent";

type TestBlockProps = {
	text?: string;
	onClick?: () => void;
};

class TestBlock extends Block<TestBlockProps> {
	static componentName = "TestBlock";

	protected template = '<button ref="button">{{text}}</button>';

	constructor(props: TestBlockProps = {}) {
		super(props);

		this.events = {
			click: () => this.props.onClick?.(),
		};
	}

	getButtonRef() {
		return this.refs.button;
	}
}

type ChildProps = {
	children?: string;
	text?: string;
};

class ChildBlock extends Block<ChildProps> {
	static componentName = "ChildBlock";

	protected template = "<span>{{#if children}}{{{children}}}{{else}}{{text}}{{/if}}</span>";
}

class ParentBlock extends Block<object> {
	protected template =
		'<section>{{#ChildBlock ref="child"}}Nested{{/ChildBlock}}</section>';
}

describe("Block", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("renders element from template lazily", () => {
		const block = new TestBlock({ text: "Initial" });
		const element = block.element();

		expect(element?.tagName).toBe("BUTTON");
		expect(element?.textContent).toBe("Initial");
	});

	it("updates rendered element when props change", () => {
		const block = new TestBlock({ text: "Initial" });
		document.body.append(block.element() as Element);

		block.setProps({ text: "Updated" });

		expect(document.body.querySelector("button")?.textContent).toBe(
			"Updated",
		);
	});

	it("attaches event listeners from component events", () => {
		const onClick = vi.fn();
		const block = new TestBlock({ onClick });

		block.element()?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

		expect(onClick).toHaveBeenCalledOnce();
	});

	it("collects refs from rendered template", () => {
		const block = new TestBlock();

		block.element();

		expect(block.getButtonRef()).toBeInstanceOf(HTMLButtonElement);
		expect(block.getButtonRef()?.hasAttribute("ref")).toBe(false);
	});
});

describe("registerComponent", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		registerComponent(ChildBlock);
	});

	it("embeds registered child components and forwards slot content", () => {
		const parent = new ParentBlock();
		const element = parent.element();

		expect(element?.querySelector("span")?.textContent).toBe("Nested");
	});
});

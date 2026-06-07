import Handlebars from "handlebars";
import type { HelperOptions } from "handlebars";
import type { BlockComponent, BlockOwnProps } from "./block";

let uniqueId = 0;

export function registerComponent<Props extends object>(
	Component: BlockComponent<Props>,
) {
	const dataAttribute = `data-component-hbs-id="${++uniqueId}"`;

	Handlebars.registerHelper(
		Component.componentName,
		function (this: unknown, options: HelperOptions) {
			const { hash, data } = options;
			const slotProps: BlockOwnProps = {
				__children: [],
				__refs: {},
			};
			const children =
				typeof options.fn === "function"
					? options.fn(this, {
							data: {
								...data,
								root: slotProps,
							},
						})
					: undefined;
			const component = new Component({
				...hash,
				children,
				...slotProps,
			} as Props);

			if ("ref" in hash) {
				(data.root.__refs = data.root.__refs || {})[hash.ref] =
					component.element();
			}

			(data.root.__children = data.root.__children || []).push({
				component,
				embed(node: DocumentFragment) {
					const placeholder = node.querySelector(
						`[${dataAttribute}]`,
					);

					if (!placeholder) {
						throw new Error(
							`Can't find data-id for component ${Component.componentName}`,
						);
					}

					const element = component.element();

					if (!element) {
						throw new Error("Component element is not created");
					}

					placeholder.replaceWith(element);
				},
			});

			return new Handlebars.SafeString(`<div ${dataAttribute}></div>`);
		},
	);
}

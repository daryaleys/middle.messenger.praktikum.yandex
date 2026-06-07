import { Block } from "@src/core/block/block";
import { isEqual } from "@src/utils/object";

import store from "./store";

type Indexed = {
	[key in string]: unknown;
};

type MapStateToProps<StateProps extends object> = (
	state: Indexed,
) => StateProps;

type BlockConstructor<Props extends object> = new (
	props: Props,
) => Block<Props>;

export function connect<StateProps extends object>(
	mapStateToProps: MapStateToProps<StateProps>,
) {
	return function withStore<OwnProps extends object>(
		Component: BlockConstructor<OwnProps & StateProps>,
	) {
		const ConnectedComponent = class extends Component {
			protected declare template: string;

			constructor(props: OwnProps) {
				let stateProps = mapStateToProps(store.getState());

				super({ ...props, ...stateProps });

				store.subscribe(() => {
					const newStateProps = mapStateToProps(store.getState());

					if (!isEqual(stateProps, newStateProps)) {
						this.setProps({ ...newStateProps });
					}

					stateProps = newStateProps;
				});
			}
		};

		return ConnectedComponent;
	};
}

import { Block } from "@src/core/block/block";
import { isEqual } from "@src/utils/object";

type StoreLike<State extends Record<string, unknown> = Record<string, unknown>> = {
	getState(): State;
	subscribe(listener: () => void): () => void;
};

type MapStateToProps<
	State extends Record<string, unknown>,
	StateProps extends object,
> = (
	state: State,
) => StateProps;

type BlockConstructor<Props extends object> = new (
	props: Props,
) => Block<Props>;

export function connect<
	State extends Record<string, unknown>,
	StateProps extends object,
>(
	store: StoreLike<State>,
	mapStateToProps: MapStateToProps<State, StateProps>,
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

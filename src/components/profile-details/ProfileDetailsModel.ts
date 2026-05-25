import type { ProfileDetailsProps } from "./types";

export class ProfileDetailsModel {
	private readonly props: ProfileDetailsProps;

	constructor(props: ProfileDetailsProps) {
		this.props = props;
	}

	getDetailsData(): ProfileDetailsProps {
		return this.props;
	}
}

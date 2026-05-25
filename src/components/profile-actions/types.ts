export type ProfileAction = {
	href: string;
	label: string;
	isDanger?: boolean;
};

export type ProfileActionsProps = {
	actions?: ProfileAction[];
};

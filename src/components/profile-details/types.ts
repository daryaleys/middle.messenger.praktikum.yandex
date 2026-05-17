export type ProfileDetailField = {
	label: string;
	value?: string;
};

export type ProfileDetailsProps = {
	profileData: {
		mainFields: ProfileDetailField[];
	};
};

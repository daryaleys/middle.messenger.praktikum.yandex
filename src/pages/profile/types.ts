export type ProfileMode = "view" | "edit" | "password";

export type ProfileField = {
	label: string;
	name: string;
	type: string;
	value?: string;
};

export type ProfileData = {
	firstName: string;
	mainFields: ProfileField[];
	passwordFields: ProfileField[];
};

export type ProfilePageProps = {
	isDataEditMode: boolean;
	isPasswordEditMode: boolean;
	profileData: ProfileData;
};

import type { ValidationRuleName } from "@src/utils/validation";

export type ProfileMode = "view" | "edit" | "password";

export type ProfileField = {
	label: string;
	name: string;
	type: string;
	value?: string;
	validationRule?: ValidationRuleName;
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

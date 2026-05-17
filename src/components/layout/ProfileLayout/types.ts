import type { ProfileDetailsProps } from "@src/components/profile-details/types";
import type { ProfileFormFieldProps } from "@src/components/UI/profile-form-field/types";

export type ProfileLayoutProps = {
	profileData: ProfileDetailsProps["profileData"] & {
		firstName: string;
		passwordFields: ProfileFormFieldProps[];
	};
	isDataEditMode?: boolean;
	isPasswordEditMode?: boolean;
};

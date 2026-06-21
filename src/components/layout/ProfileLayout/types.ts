import type { ProfileDetailsProps } from "@src/components/profile-details/types";
import type { ProfileEditFormMode } from "@src/components/profile-edit-form/types";
import type { InlineFormFieldProps } from "@src/components/ui/inline-form-field/types";

export type ProfileLayoutProps = {
	profileData: ProfileDetailsProps["profileData"] & {
		avatar: string;
		firstName: string;
		passwordFields: InlineFormFieldProps[];
	};
	backHref?: string;
	dataEditFormMode?: ProfileEditFormMode;
	isDataEditMode?: boolean;
	isPasswordEditMode?: boolean;
	passwordEditFormMode?: ProfileEditFormMode;
};

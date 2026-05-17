import type { AuthLayoutProps } from "@src/components/layout/AuthLayout/types";
import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";

export type SigninPageData = AuthLayoutProps;

export type SigninPageProps = {
	signInPageData: SigninPageData;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

import type { AuthLayoutProps } from "@src/components/layout/AuthLayout/types";
import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";

export type LoginPageData = AuthLayoutProps;

export type LoginPageProps = {
	loginPageData: LoginPageData;
	formErrors?: ValidationErrors;
	formValues?: FormValues;
};

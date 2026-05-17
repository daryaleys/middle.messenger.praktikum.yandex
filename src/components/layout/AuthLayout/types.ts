import type { AuthFormProps } from "@src/components/auth-form/types";

export type AuthLayoutProps = AuthFormProps & {
	cardModifier: string;
	title: string;
	titleId: string;
};

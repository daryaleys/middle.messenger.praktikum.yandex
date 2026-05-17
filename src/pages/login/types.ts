type AuthFieldData = {
	label: string;
	name: string;
	type: string;
};

export type LoginPageData = {
	cardModifier: string;
	fieldsModifier: string;
	linkHref: string;
	linkText: string;
	submitText: string;
	title: string;
	titleId: string;
	fields: AuthFieldData[];
};

export type LoginPageProps = {
	loginPageData: LoginPageData;
};

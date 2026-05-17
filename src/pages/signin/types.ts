type AuthFieldData = {
	label: string;
	name: string;
	type: string;
};

export type SigninPageData = {
	cardModifier: string;
	fieldsModifier: string;
	linkHref: string;
	linkText: string;
	submitText: string;
	title: string;
	titleId: string;
	fields: AuthFieldData[];
};

export type SigninPageProps = {
	signInPageData: SigninPageData;
};

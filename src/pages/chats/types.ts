import type { DialogLayoutProps } from "@src/components/layout/DialogLayout/types";
import type { SidebarLayoutProps } from "@src/components/layout/SidebarLayout/types";
import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";

export type ChatsPageProps = SidebarLayoutProps &
	DialogLayoutProps & {
		formErrors?: ValidationErrors;
		formValues?: FormValues;
	};

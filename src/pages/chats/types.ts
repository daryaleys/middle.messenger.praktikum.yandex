import type { DialogLayoutProps } from "@src/components/layout/DialogLayout/types";
import type { SidebarLayoutProps } from "@src/components/layout/SidebarLayout/types";
import type {
	FormValues,
	ValidationErrors,
} from "@src/utils/validation";

export type ChatsPageProps = SidebarLayoutProps &
	DialogLayoutProps & {
		deleteChatError?: string | null;
		deletingChatId?: number | null;
		error?: string | null;
		formErrors?: ValidationErrors;
		formValues?: FormValues;
		isLoading?: boolean;
		onFileSubmit?: (file: File) => void;
		onMessageSubmit?: (message: string) => void;
	};

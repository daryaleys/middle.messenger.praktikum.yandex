import { registerComponent } from "@src/core/registerComponent";
import { AuthForm } from "@src/components/auth-form/AuthForm";
import { DemoNavigation } from "@src/components/demo-navigation/DemoNavigation";
import { AuthLayout } from "@src/components/layout/AuthLayout/AuthLayout";
import { DialogLayout } from "@src/components/layout/DialogLayout/DialogLayout";
import { ProfileLayout } from "@src/components/layout/ProfileLayout/ProfileLayout";
import { ServiceLayout } from "@src/components/layout/ServiceLayout/ServiceLayout";
import { SidebarLayout } from "@src/components/layout/SidebarLayout/SidebarLayout";
import { ProfileActions } from "@src/components/profile-actions/ProfileActions";
import { ProfileDetails } from "@src/components/profile-details/ProfileDetails";
import { ProfileEditForm } from "@src/components/profile-edit-form/ProfileEditForm";
import { AuthField } from "@src/components/UI/auth-field/AuthField";
import { ChatItem } from "@src/components/UI/chat-item/ChatItem";
import { ProfileAvatar } from "@src/components/UI/profile-avatar/ProfileAvatar";
import { ProfileFormField } from "@src/components/UI/profile-form-field/ProfileFormField";
import { SubmitButton } from "@src/components/UI/submit-button/SubmitButton";

export function registerComponents() {
	registerComponent(AuthField);
	registerComponent(AuthForm);
	registerComponent(AuthLayout);
	registerComponent(ChatItem);
	registerComponent(DemoNavigation);
	registerComponent(DialogLayout);
	registerComponent(ProfileActions);
	registerComponent(ProfileAvatar);
	registerComponent(ProfileDetails);
	registerComponent(ProfileEditForm);
	registerComponent(ProfileFormField);
	registerComponent(ProfileLayout);
	registerComponent(ServiceLayout);
	registerComponent(SidebarLayout);
	registerComponent(SubmitButton);
}

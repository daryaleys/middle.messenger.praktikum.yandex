import Handlebars from "handlebars";

import authPageTemplate from "@src/layouts/auth/auth.hbs?raw";
import dialogTemplate from "@src/layouts/dialog/dialog.hbs?raw";
import profilePageTemplate from "@src/layouts/profile/profile.hbs?raw";
import sidebarTemplate from "@src/layouts/sidebar/sidebar.hbs?raw";

import authFieldTemplate from "@src/components/auth-field/auth-field.hbs?raw";
import chatItemTemplate from "@src/components/chat-item/chat-item.hbs?raw";
import demoNavigationTemplate from "@src/components/demo-navigation/demo-navigation.hbs?raw";
import profileActionsTemplate from "@src/components/profile-actions/profile-actions.hbs?raw";
import profileAvatarTemplate from "@src/components/profile-avatar/profile-avatar.hbs?raw";
import profileDetailsTemplate from "@src/components/profile-details/profile-details.hbs?raw";
import profileEditFormTemplate from "@src/components/profile-edit-form/profile-edit-form.hbs?raw";
import profileFormFieldTemplate from "@src/components/profile-form-field/profile-form-field.hbs?raw";
import servicePageTemplate from "@src/components/service-page/service-page.hbs?raw";

export function registerPartials() {
	Handlebars.registerPartial("auth-page", authPageTemplate);
	Handlebars.registerPartial("profile-page", profilePageTemplate);
	Handlebars.registerPartial("sidebar", sidebarTemplate);
	Handlebars.registerPartial("auth-field", authFieldTemplate);
	Handlebars.registerPartial("chat-item", chatItemTemplate);
	Handlebars.registerPartial("dialog", dialogTemplate);
	Handlebars.registerPartial("profile-actions", profileActionsTemplate);
	Handlebars.registerPartial("profile-avatar", profileAvatarTemplate);
	Handlebars.registerPartial("profile-details", profileDetailsTemplate);
	Handlebars.registerPartial("profile-edit-form", profileEditFormTemplate);
	Handlebars.registerPartial("service-page", servicePageTemplate);
	Handlebars.registerPartial("profile-form-field", profileFormFieldTemplate);
	Handlebars.registerPartial("demo-navigation", demoNavigationTemplate);
}

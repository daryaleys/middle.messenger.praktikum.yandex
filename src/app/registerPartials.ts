import Handlebars from "handlebars";

import authLayoutTemplate from "@src/components/layout/AuthLayout/AuthLayout.hbs?raw";
import dialogLayoutTemplate from "@src/components/layout/DialogLayout/DialogLayout.hbs?raw";
import profileLayoutTemplate from "@src/components/layout/ProfileLayout/ProfileLayout.hbs?raw";
import sidebarLayoutTemplate from "@src/components/layout/SidebarLayout/SidebarLayout.hbs?raw";
import serviceLayoutTemplate from "@src/components/layout/ServiceLayout/ServiceLayout.hbs?raw";

import authFieldTemplate from "@src/components/auth-field/auth-field.hbs?raw";
import chatItemTemplate from "@src/components/chat-item/chat-item.hbs?raw";
import demoNavigationTemplate from "@src/components/demo-navigation/demo-navigation.hbs?raw";
import profileActionsTemplate from "@src/components/profile-actions/profile-actions.hbs?raw";
import profileAvatarTemplate from "@src/components/profile-avatar/profile-avatar.hbs?raw";
import profileDetailsTemplate from "@src/components/profile-details/profile-details.hbs?raw";
import profileEditFormTemplate from "@src/components/profile-edit-form/profile-edit-form.hbs?raw";
import profileFormFieldTemplate from "@src/components/profile-form-field/profile-form-field.hbs?raw";

export function registerPartials() {
	Handlebars.registerPartial("auth-layout", authLayoutTemplate);
	Handlebars.registerPartial("profile-layout", profileLayoutTemplate);
	Handlebars.registerPartial("sidebar-layout", sidebarLayoutTemplate);
	Handlebars.registerPartial("dialog-layout", dialogLayoutTemplate);
	Handlebars.registerPartial("auth-field", authFieldTemplate);
	Handlebars.registerPartial("chat-item", chatItemTemplate);
	Handlebars.registerPartial("profile-actions", profileActionsTemplate);
	Handlebars.registerPartial("profile-avatar", profileAvatarTemplate);
	Handlebars.registerPartial("profile-details", profileDetailsTemplate);
	Handlebars.registerPartial("profile-edit-form", profileEditFormTemplate);
	Handlebars.registerPartial("service-layout", serviceLayoutTemplate);
	Handlebars.registerPartial("profile-form-field", profileFormFieldTemplate);
	Handlebars.registerPartial("demo-navigation", demoNavigationTemplate);
}

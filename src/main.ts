import Handlebars from "handlebars";

// pages
import messengerTemplate from "./pages/messenger/messenger.hbs?raw";
import profileTemplate from "./pages/profile/profile.hbs?raw";
import loginTemplate from "./pages/login/login.hbs?raw";
import signInTemplate from "./pages/signin/signin.hbs?raw";
import notFoundTemplate from "./pages/not-found/not-found.hbs?raw";
import serverErrorTemplate from "./pages/server-error/server-error.hbs?raw";

// templates
import sidebarTemplate from "./layouts/sidebar/sidebar.hbs?raw";
import authPageTemplate from "./layouts/auth/auth.hbs?raw";
import profilePageTemplate from "./layouts/profile/profile.hbs?raw";
import authFieldTemplate from "./components/auth-field/auth-field.hbs?raw";
import chatItemTemplate from "./components/chat-item/chat-item.hbs?raw";
import dialogTemplate from "./layouts/dialog/dialog.hbs?raw";
import profileActionsTemplate from "./components/profile-actions/profile-actions.hbs?raw";
import profileAvatarTemplate from "./components/profile-avatar/profile-avatar.hbs?raw";
import profileDetailsTemplate from "./components/profile-details/profile-details.hbs?raw";
import profileEditFormTemplate from "./components/profile-edit-form/profile-edit-form.hbs?raw";
import servicePageTemplate from "./components/service-page/service-page.hbs?raw";
import profileFormFieldTemplate from "./components/profile-form-field/profile-form-field.hbs?raw";

// fields list
import { profileData } from "./data/profile";
import { loginPageData, signInPageData } from "./data/auth";

// mock data
import { activeChat, chats } from "./mock/chats";

// styles
import "./style.css";

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

const pageTemplateByPath: Record<string, string> = {
    "/": messengerTemplate,
    "/settings": profileTemplate,
    "/settings/edit": profileTemplate,
    "/settings/password": profileTemplate,
    "/login": loginTemplate,
    "/signin": signInTemplate,
    "/404": notFoundTemplate,
    "/500": serverErrorTemplate,
};

// Временные маркеры для возможности посмотреть верстку
const isDataEditMode = window.location.pathname === "/settings/edit";
const isPasswordEditMode = window.location.pathname === "/settings/password";

const currentPageTemplate = pageTemplateByPath[window.location.pathname] ?? notFoundTemplate;
const compiledTemplate = Handlebars.compile(currentPageTemplate)({
    chats,
    activeChat,
    isDataEditMode,
    isPasswordEditMode,
    loginPageData,
    signInPageData,
    profileData,
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = compiledTemplate;

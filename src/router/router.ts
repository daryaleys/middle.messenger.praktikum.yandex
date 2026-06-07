import { Router } from "@src/core";
import {
	AUTH_STATUS,
	getAuthStatus,
	setAuthorized,
	setGuest,
} from "@src/store";
import { userAPI } from "@src/api/auth/user-api";
import { ChatsPage } from "@src/pages/chats/ChatsPage";
import { LoginPage } from "@src/pages/login/LoginPage";
import { NotFoundPage } from "@src/pages/not-found/NotFoundPage";
import { ProfilePage } from "@src/pages/profile/ProfilePage";
import { ServerErrorPage } from "@src/pages/server-error/ServerErrorPage";
import { SigninPage } from "@src/pages/signin/SigninPage";
import { ROUTES } from "./routes";

async function authGuard() {
	const authStatus = getAuthStatus();

	if (authStatus !== AUTH_STATUS.unchecked) {
		return authStatus === AUTH_STATUS.authorized;
	}

	try {
		await userAPI.request();
		setAuthorized();
		return true;
	} catch {
		setGuest();
		return false;
	}
}

export const router = new Router({
	authGuard,
	authorizedRoute: ROUTES.messenger,
	loginRoute: ROUTES.login,
	notFoundRoute: ROUTES.notFound,
})
	.use(ROUTES.login, () => new LoginPage(), { isPublicOnly: true })
	.use(ROUTES.signUp, () => new SigninPage(), { isPublicOnly: true })
	.use(ROUTES.settings, () => new ProfilePage("view"), {
		isProtected: true,
	})
	.use(ROUTES.settingsEdit, () => new ProfilePage("edit"), {
		isProtected: true,
	})
	.use(ROUTES.settingsPassword, () => new ProfilePage("password"), {
		isProtected: true,
	})
	.use(ROUTES.messenger, () => new ChatsPage(), { isProtected: true })
	.use(ROUTES.notFound, () => new NotFoundPage())
	.use(ROUTES.serverError, () => new ServerErrorPage());

import Router from "@src/core/Router";
import { ChatsPage } from "@src/pages/chats/ChatsPage";
import { LoginPage } from "@src/pages/login/LoginPage";
import { NotFoundPage } from "@src/pages/not-found/NotFoundPage";
import { ProfilePage } from "@src/pages/profile/ProfilePage";
import { ServerErrorPage } from "@src/pages/server-error/ServerErrorPage";
import { SigninPage } from "@src/pages/signin/SigninPage";

export const router = new Router()
	.use("/", () => new LoginPage())
	.use("/sign-up", () => new SigninPage())
	.use("/settings", () => new ProfilePage("view"))
	.use("/settings/edit", () => new ProfilePage("edit"))
	.use("/settings/password", () => new ProfilePage("password"))
	.use("/messenger", () => new ChatsPage())
	.use("/404", () => new NotFoundPage())
	.use("/500", () => new ServerErrorPage());

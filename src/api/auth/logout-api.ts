import { BaseAPI } from "@src/core";

import { authAPIInstance } from "./auth-instance";

export class LogoutAPI extends BaseAPI {
	request(): Promise<void> {
		return authAPIInstance.post("/logout");
	}
}

export const logoutAPI = new LogoutAPI();

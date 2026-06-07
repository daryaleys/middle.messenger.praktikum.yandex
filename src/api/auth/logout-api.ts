import { BaseAPI } from "@src/core";

import { authAPIInstance } from "./auth-instance";

export class LogoutAPI extends BaseAPI {
	request() {
		return authAPIInstance.post<void>("/logout");
	}
}

export const logoutAPI = new LogoutAPI();

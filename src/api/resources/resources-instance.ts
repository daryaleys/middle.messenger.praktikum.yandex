import { HTTPTransport } from "@src/core";
import { API_BASE_URL } from "../base-url";

export const resourcesAPIInstance = new HTTPTransport(
	`${API_BASE_URL}/resources`,
);

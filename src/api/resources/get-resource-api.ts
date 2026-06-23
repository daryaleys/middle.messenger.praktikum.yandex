import { BaseAPI } from "@src/core";
import { resourcesAPIInstance } from "./resources-instance";

export class GetResourceAPI extends BaseAPI {
	request(path: string): Promise<Blob> {
		return resourcesAPIInstance.get(`/${path}`, { responseType: "blob" });
	}
}

export const getResourceAPI = new GetResourceAPI();

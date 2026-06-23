import { BaseAPI } from "@src/core";
import { resourcesAPIInstance } from "./resources-instance";

export type ResourceModel = {
	id: number;
	user_id: number;
	path: string;
	filename: string;
	content_type: string;
	content_size: number;
	upload_date: string;
};

export class UploadResourceAPI extends BaseAPI {
	request(form: FormData): Promise<ResourceModel> {
		return resourcesAPIInstance.post("", { data: form });
	}
}

export const uploadResourceAPI = new UploadResourceAPI();

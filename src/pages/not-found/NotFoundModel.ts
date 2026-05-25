import type { NotFoundPageProps } from "./types";

export class NotFoundModel {
	getPageData(): NotFoundPageProps {
		return {
			code: "404",
			message: "Не туда попали",
		};
	}
}

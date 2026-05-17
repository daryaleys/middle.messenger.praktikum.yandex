import type { ServerErrorPageProps } from "./types";

export class ServerErrorModel {
	getPageData(): ServerErrorPageProps {
		return {
			code: "500",
			message: "Мы уже фиксим",
		};
	}
}

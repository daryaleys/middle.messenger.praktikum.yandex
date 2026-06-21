import { beforeAll, describe, expect, it } from "vitest";
import { registerComponent } from "@src/core";
import { DeleteButton } from "@src/components/ui/delete-button/DeleteButton";
import { ChatItem } from "./ChatItem";

beforeAll(() => {
	registerComponent(DeleteButton);
});

describe("ChatItem", () => {
	it("renders chat id and delete button id", () => {
		const item = new ChatItem({
			id: 7,
			title: "Project chat",
		}).element();

		const deleteButton = item?.querySelector("[data-delete-button-id]");

		expect(item?.getAttribute("data-id")).toBe("7");
		expect(deleteButton?.getAttribute("data-delete-button-id")).toBe("7");
	});

	it("renders avatar image when avatar url is provided", () => {
		const item = new ChatItem({
			avatarUrl: "/avatar.png",
			id: 7,
			title: "Project chat",
		}).element();

		const image = item?.querySelector("img") as HTMLImageElement | null;

		expect(image?.getAttribute("src")).toBe("/avatar.png");
	});
});

import { describe, expect, it } from "vitest";
import { API_BASE_URL } from "@src/api";
import { ChatMessage } from "./ChatMessage";

describe("ChatMessage", () => {
	it("renders message id", () => {
		const message = new ChatMessage({
			author: "Darya",
			id: 15,
			text: "Hello",
			time: "10:00",
		}).element();

		expect(message?.getAttribute("data-id")).toBe("15");
	});

	it("renders image when image url is provided", () => {
		const message = new ChatMessage({
			author: "Darya",
			id: 15,
			imageUrl: "/photo.png",
			time: "10:00",
		}).element();

		const image = message?.querySelector("img") as HTMLImageElement | null;

		expect(image?.getAttribute("src")).toBe(
			`${API_BASE_URL}/resources/photo.png`,
		);
	});
});

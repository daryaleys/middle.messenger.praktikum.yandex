import { describe, expect, it } from "vitest";
import { SubmitButton } from "./SubmitButton";

describe("SubmitButton", () => {
	it("renders default button text", () => {
		const button = new SubmitButton().element() as HTMLButtonElement;

		expect(button.disabled).toBe(false);
	});

	it("renders loading state", () => {
		const button = new SubmitButton({
			disabled: true,
			isLoading: true,
			loadingText: "Отправляем...",
		}).element() as HTMLButtonElement;

		expect(button.disabled).toBe(true);
	});
});

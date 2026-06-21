import { describe, expect, it } from "vitest";
import { DeleteButton } from "./DeleteButton";

describe("DeleteButton", () => {
	it("renders delete button attributes", () => {
		const button = new DeleteButton({
			className: "extra-class",
			id: 42,
			label: "Удалить чат",
		}).element() as HTMLButtonElement;

		expect(button.getAttribute("data-delete-button-id")).toBe("42");
	});

	it("renders disabled state", () => {
		const button = new DeleteButton({
			disabled: true,
			id: "user-1",
			label: "Удалить пользователя",
		}).element() as HTMLButtonElement;

		expect(button.disabled).toBe(true);
	});
});

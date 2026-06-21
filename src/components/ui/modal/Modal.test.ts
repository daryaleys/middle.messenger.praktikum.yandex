import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
	it("renders hidden modal by default", () => {
		const modal = new Modal({
			id: "create-chat",
			label: "Создать чат",
		}).element() as HTMLDivElement;

		expect(modal.getAttribute("id")).toBe("create-chat");
		expect(modal.hasAttribute("hidden")).toBe(true);
	});

	it("calls onClose when opened modal is closed by overlay click", () => {
		const onClose = vi.fn();
		const modal = new Modal({
			id: "create-chat",
			isOpen: true,
			label: "Создать чат",
			onClose,
		}).element() as HTMLDivElement;

		document.body.append(modal);
		modal.querySelector("[data-modal-close]")?.dispatchEvent(
			new MouseEvent("click", { bubbles: true }),
		);

		expect(onClose).toHaveBeenCalledOnce();
	});

	it("calls onClose when Escape is pressed", () => {
		const onClose = vi.fn();
		const modal = new Modal({
			id: "create-chat",
			isOpen: true,
			label: "Создать чат",
			onClose,
		}).element() as HTMLDivElement;

		document.body.append(modal);
		document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

		expect(onClose).toHaveBeenCalledOnce();
	});
});

import { beforeAll, describe, expect, it } from "vitest";
import { registerComponent } from "@src/core";
import { Input } from "@src/components/ui/input/Input";
import { ProfileAvatar } from "./ProfileAvatar";

beforeAll(() => {
	registerComponent(Input);
});

describe("ProfileAvatar", () => {
	it("renders avatar image when avatar is provided", () => {
		const avatar = new ProfileAvatar({
			avatar: "/avatar.png",
		}).element();

		const image = avatar?.querySelector("img") as HTMLImageElement | null;

		expect(image?.getAttribute("src")).toBe("/avatar.png");
	});

	it("disables avatar input while loading", () => {
		const avatar = new ProfileAvatar({
			isLoading: true,
		}).element();

		const input = avatar?.querySelector("input") as HTMLInputElement | null;

		expect(input?.disabled).toBe(true);
	});

	it("renders status message container when status is provided", () => {
		const avatar = new ProfileAvatar({
			statusMessage: "Updated",
		}).element();

		expect(avatar?.querySelector("p")).not.toBeNull();
	});
});

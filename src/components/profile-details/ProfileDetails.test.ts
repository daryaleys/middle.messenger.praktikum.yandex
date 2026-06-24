import { describe, expect, it } from "vitest";
import { ProfileDetails } from "./ProfileDetails";

describe("ProfileDetails", () => {
	it("renders profile field values", () => {
		const details = new ProfileDetails({
			profileData: {
				mainFields: [
					{ label: "Login", value: "tester" },
					{ label: "Email", value: "tester@example.com" },
				],
			},
		}).element();

		const values = Array.from(details?.querySelectorAll("dd") ?? []);

		expect(values).toHaveLength(2);
		expect(values.map((value) => value.textContent)).toEqual([
			"tester",
			"tester@example.com",
		]);
	});
});

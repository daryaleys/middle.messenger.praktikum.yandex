/** @type {import("stylelint").Config} */
export default {
	extends: ["stylelint-config-standard"],
	ignoreFiles: ["dist/**"],
	rules: {
		"media-feature-range-notation": null,
		"no-descending-specificity": null,
		"property-no-deprecated": null,
		"selector-class-pattern":
			"^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
		"value-keyword-case": null,
	},
};

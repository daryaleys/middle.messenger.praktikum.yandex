import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		checker({
			typescript: true,
			eslint: {
				lintCommand: "eslint .",
			},
			stylelint: {
				lintCommand: 'stylelint "**/*.css"',
			},
		}),
	],
	resolve: {
		alias: {
			"@src": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		open: true,
		port: Number(process.env.PORT) || 3000,
	},
});

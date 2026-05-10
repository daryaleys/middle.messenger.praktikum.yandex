import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
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

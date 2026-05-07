import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: true,
        port: Number(process.env.PORT) || 3000,
    },
});

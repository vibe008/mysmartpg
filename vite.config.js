import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      // Proxy API requests in development
      "/api": {
        target: "https://admin.shivomgroup.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/hosteladmin/public/api"),
      },
    },
  },
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  publicDir: "public",
});

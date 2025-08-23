import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
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
        assetFileNames: (assetInfo) => {
          // Handle different asset types
          const extType = assetInfo.name.split('.')[1];
          if (extType === 'png' || extType === 'jpg' || extType === 'jpeg' || extType === 'gif' || extType === 'svg') {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Optimize for better chunking
    chunkSizeWarningLimit: 1000,
  },
  publicDir: "public",
});
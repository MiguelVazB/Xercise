import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          router: ["react-router-dom"],
          animation: ["framer-motion"],
          "ui-components": ["react-horizontal-scrolling-menu"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Use default esbuild minifier
    sourcemap: false,
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'animation': ['framer-motion'],
          'ui-components': ['react-horizontal-scrolling-menu', 'react-paginate'],
        },
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 600,
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})

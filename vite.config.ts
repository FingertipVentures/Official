import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Official/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1024, // Adjust warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Move all npm packages into a separate "vendor" chunk
          }
          if (id.includes('physics')) {
            return 'physics'; // Create a separate chunk for physics files
          }
          if (id.includes('Hero3D')) {
            return 'hero'; // Separate 3D-related code
          }
        },
      },
    },
  },
});

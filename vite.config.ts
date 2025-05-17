import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2015',
    rollupOptions: {
      output: {
        // Use a format that avoids strict MIME type requirements
        format: 'iife',
        // Generate clean filenames
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Avoid code splitting to reduce complexity
        manualChunks: undefined
      }
    },
    // Process and transform the index.html file
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
    // Ensure sourcemaps are generated for debugging
    sourcemap: true
  },
  // Make the base path flexible for different deployment environments
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    // Ensure all extensions are properly resolved
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  // Optimize how assets are processed
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
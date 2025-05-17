import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Use classic format to avoid MIME type issues
    target: 'es2015'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
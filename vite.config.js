import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages project site base path
  base: '/almanara_website/',
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Increase warning limit (we split chunks)
    chunkSizeWarningLimit: 200,
    // Minification (esbuild is built-in, faster than terser)
    minify: 'esbuild',
    // No sourcemaps in production — smaller output, faster load
    sourcemap: false,
    // Inline assets smaller than 8KB (icons, tiny images)
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // React core (changes rarely)
          'vendor-react': ['react', 'react-dom'],
          // Router (changes rarely)
          'vendor-router': ['react-router-dom'],
          // i18n (changes rarely)
          'vendor-i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          // Translation files (change when content changes)
          'locales': [
            './src/locales/fr.json',
            './src/locales/ar.json',
            './src/locales/en.json'
          ]
        }
      }
    }
  }
})

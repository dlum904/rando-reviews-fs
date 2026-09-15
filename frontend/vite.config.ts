import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  server: {
    port: 3000,
    // Mirrors the single-domain setup on Vercel so VITE_API_URL can stay relative in dev.
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import postcss from 'postcss'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcss()]
    }
  },
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://self-blog-server.vercel.app/api/',
        changeOrigin: true,  // Make sure the origin is properly set for cross-origin requests
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

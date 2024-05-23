import { fileURLToPath, URL } from 'node:url'
import axios from 'axios'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// const { defineConfig } = require('@vue/cli-service')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})

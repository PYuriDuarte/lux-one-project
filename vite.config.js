import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: "/lux-one-project",
  publicPath: '/lux-one-project/',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@import "src/scss/main.scss";'},
    }
  }
})

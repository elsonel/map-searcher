import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dotenv from 'dotenv'

// expose environmental variables to netlify
const viteEnv: { [key: string]: string | undefined } = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  define: viteEnv,
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src')
    }
  }
})

// Load .env variables
dotenv.config()

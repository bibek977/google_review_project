import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: "https://googlereview.up.railway.app/"
  },
  plugins: [react()],
  manifest: true,
  rollupOptions: {
  },
})

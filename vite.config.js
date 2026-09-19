import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths so assets resolve on both nuviixd-a.github.io/info.bio/
  // and the custom domain (saphireservices.lol) without rebuilding.
  base: './',
})

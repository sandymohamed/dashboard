import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// svgr allows you to import SVG files as React components
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
})

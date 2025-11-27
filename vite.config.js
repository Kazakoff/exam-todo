import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
        // esbuild: {
        // loader: 'jsx', // Set the default loader for all files
        // include: /\\.[jt]sx?$/, // Ensure it applies to .js, .jsx, .ts, .tsx
      // },
})

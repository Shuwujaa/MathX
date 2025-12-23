import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MathX/',  // <-- add this
  plugins: [react()],
})

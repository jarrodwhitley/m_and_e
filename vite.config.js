import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/m_and_e/',
    root: 'src',
    // build: {
    //     outDir: '../build',
    //     emptyOutDir: true, // also necessary
    // },
  plugins: [vue()],
})

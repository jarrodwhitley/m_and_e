import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/m_and_e/',
    root: './',
    build: {
        outDir: './dist',
        emptyOutDir: true, // also necessary
        publicDir: 'assets',
        manifest: true,
    },
    plugins: [vue()],
})

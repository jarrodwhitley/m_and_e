import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    root: './',
    server: {
        host: true,
        allowedHosts: true,
    },
    build: {
        outDir: './dist',
        emptyOutDir: true, // also necessary
        manifest: true,
    },
    plugins: [vue()],
})

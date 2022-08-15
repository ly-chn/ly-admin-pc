import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }), AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),],
    resolve: {
        alias: [
            // /@/xxxx => src/xxxx
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/',
            },
            // /#/xxxx => types/xxxx
            {
                find: /\/#\//,
                replacement: pathResolve('types') + '/',
            },
        ],
    }
})

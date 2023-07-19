import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {fileURLToPath, URL} from 'node:url'
import UnoCss from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    base: loadEnv(mode, process.cwd()).VITE_APP_BASE,
    plugins: [
      vue(),
      Inspect(),
      UnoCss(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url))
      }
    },
    server: {
      port: 920,
      proxy: {
        '/api': {
          target: 'http://localhost:5021/',
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})

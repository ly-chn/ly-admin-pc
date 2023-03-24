import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  preflight: false,
  darkMode: 'class',
  plugins: [formsPlugin],
})

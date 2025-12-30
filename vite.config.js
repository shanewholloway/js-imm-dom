import { defineConfig } from 'vite'
import rpi_jsy from '@jsy-lang/jsy/esm/rollup.js'

export default defineConfig({
  plugins: [
    rpi_jsy(),
  ],
})

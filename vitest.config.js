import { defineConfig } from 'vitest/config'
import rpi_jsy from '@jsy-lang/jsy/esm/rollup.js'

export default defineConfig({
  plugins: [
    rpi_jsy(),
  ],
  test: {
    include: [
      'code/**/*.test.js',
      'code/**/*.test.jsy',
    ],
  },
})

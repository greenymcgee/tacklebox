/* eslint-disable sort-keys */
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/'],
      provider: 'v8',
      thresholds: {
        branches: 97,
        functions: 99,
        lines: 99,
        statements: 99,
      },
    },
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
})

/* eslint-enable sort-keys */

/* eslint-disable sort-keys */
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['packages/'],
      exclude: ['packages/**/dist/**'],
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
})

/* eslint-enable sort-keys */

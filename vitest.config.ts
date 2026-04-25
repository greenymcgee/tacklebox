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
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['packages/**/*.{test,spec}.ts'],
          exclude: [
            'packages/react-components/**/*.test.tsx',
            'packages/react-components/**/*.test.ts',
            '**/node_modules/**',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'react-components',
          environment: 'jsdom',
          include: [
            'packages/react-components/**/*.test.tsx',
            'packages/react-components/**/*.test.ts',
          ],
          setupFiles: ['./vitest.react-setup.ts'],
        },
      },
    ],
  },
})

/* eslint-enable sort-keys */

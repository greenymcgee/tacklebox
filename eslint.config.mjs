import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  js.configs.recommended,
  {
    ignores: ['**/node_modules/**', 'packages/next-eslint-config/index.mjs', 'pnpm-lock.yaml'],
  },
  {
    files: ['**/*.{js,mjs}'],
    plugins: {
      'import': importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      camelcase: 'error',
      'import/no-cycle': 'error',
      'import/no-named-as-default': 0,
      'no-console': 'error',
      'no-unused-vars': 'error',
      'object-shorthand': 'error',
      'require-await': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys': 'error',
    },
  },
]

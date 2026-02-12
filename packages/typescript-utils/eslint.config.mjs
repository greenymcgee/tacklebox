import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import typescriptEslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
      '@vitest': vitest,
      'jsx-a11y': jsxA11y,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@vitest/max-expects': [
        'error',
        {
          max: 2,
        },
      ],

      camelcase: 'error',
      'import/no-cycle': 'error',
      'import/no-named-as-default': 0,
      'no-console': 'error',
      'object-shorthand': 'error',
      'require-await': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys': 'error',

      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
        },
      ],
    },
  },
];

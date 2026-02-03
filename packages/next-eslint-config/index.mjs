import vitest from '@vitest/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      '@vitest': vitest,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // General rules
      camelcase: 'error',
      'require-await': 'error',
      'no-console': 'error',
      'object-shorthand': 'error',

      // Vitest rules
      '@vitest/max-expects': [
        'error',
        {
          max: 2,
        },
      ],

      // Import rules
      'import/no-cycle': 'error',
      'import/no-named-as-default': 0,

      // Import sort rules
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^react$', '^@?\\w'], ['^'], ['^\\.']],
        },
      ],
      'sort-keys': 'error',

      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: ['Label'],
        },
      ],

      // React rules
      'react/button-has-type': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-sort-props': 'error',
      'react/no-multi-comp': 'error',
      'react/no-unused-prop-types': 2,
      'react/self-closing-comp': 'error',
    },
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
      },
      react: {
        version: 'detect',
      },
    },
  },
];

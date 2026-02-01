# @tacklebox/next-eslint-config

ESLint flat config for Next.js projects.

## Installation

```bash
# pnpm
npm install -D "github:greenymcgee/tacklebox#path:packages/next-eslint-config"

# pnpm
pnpm add -D "github:greenymcgee/tacklebox#path:packages/next-eslint-config"
```


## Usage

```javascript
// eslint.config.mjs
import tackleboxConfig from '@tacklebox/next-eslint-config'

export default [
  // Project-specific ignores
  {
    ignores: [
      '.next/**',
      'node_modules/**',
    ],
  },

  // Spread in tacklebox config
  ...tackleboxConfig,

  // Override or add rules as needed
  {
    rules: {
      'no-console': 'warn',
    },
  },
]
```

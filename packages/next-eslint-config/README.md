# @greenymcgee/next-eslint-config

My ESLint config for Next.js projects.

## Installation

```bash
# npm
npm install -D @greenymcgee/eslint-config

# pnpm
pnpm add -D @greenymcgee/eslint-config
```

### Peer Dependencies
- @vitest/eslint-plugin
- eslint
- eslint-config-next
- eslint-plugin-simple-import-sort

This script excludes the dependencies included by a Next.js project setup.
```bash
# npm
npm install -D @vitest/eslint-plugin eslint-plugin-simple-import-sort

# pnpm
pnpm add -D @vitest/eslint-plugin eslint-plugin-simple-import-sort
```

## Usage

```javascript
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import greenymcgeeConfig from '@greenymcgee/next-eslint-config'

export default [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...greenymcgeeConfig,

  // Override or add rules as needed
  {
    rules: {
      'no-console': 'warn',
    },
  },
]
```

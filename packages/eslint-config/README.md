# @greenymcgee/eslint-config

My ESLint config for React projects.

## Installation

```bash
# npm
npm install -D @greenymcgee/eslint-config

# pnpm
pnpm add -D @greenymcgee/eslint-config
```


## Usage

```javascript
import greenymcgeeConfig from '@greenymcgee/eslint-config'

export default [
  ...greenymcgeeConfig,

  // Override or add rules as needed
  {
    rules: {
      'no-console': 'warn',
    },
  },
]
```

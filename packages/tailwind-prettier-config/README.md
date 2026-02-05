# @greenymcgee/tailwind-prettier-config

My Prettier config for TailwindCSS projects.

## Installation

Install the config and its peer dependencies.
```bash
# npm
npm install -D @greenymcgee/tailwind-prettier-config prettier prettier-plugin-tailwindcss

# pnpm
pnpm add -D @greenymcgee/tailwind-prettier-config prettier prettier-plugin-tailwindcss
```

## Usage

```javascript
// prettier.config.mjs
import greenymcgeeConfig from '@greenymcgee/tailwind-prettier-config'

export default {
  ...greenymcgeeConfig,

  // Override or add rules as needed
  {
    printWidth: 120,
  },
}
```

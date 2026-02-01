# Tacklebox Monorepo Setup

## Repository Structure

```
tacklebox/
├── .gitignore
├── package.json              # Root package with workspaces
├── pnpm-workspace.yaml       # pnpm workspace config
├── README.md
├── docs/
│   └── setup-plan.md         # This plan file
└── packages/
    └── next-eslint-config/
        ├── package.json
        ├── README.md
        └── index.mjs         # Flat config array export
```

## Compatibility Note

The pnpm workspace is only for developing tacklebox locally. Consumers can install packages using npm, yarn, or pnpm - all work fine with the GitHub install syntax.

## 1. Root Configuration

`**pnpm-workspace.yaml**`

```yaml
packages:
  - "packages/*"
```

**Root `package.json**` - Minimal root config with workspace scripts:

```json
{
  "name": "tacklebox",
  "private": false,
  "type": "module",
  "scripts": {
    "lint": "pnpm -r lint"
  }
}
```

## 2. ESLint Config Package

`**packages/next-eslint-config/package.json**`

```json
{
  "name": "@tacklebox/next-eslint-config",
  "version": "0.1.0",
  "type": "module",
  "main": "./index.mjs",
  "exports": {
    ".": "./index.mjs"
  },
  "peerDependencies": {
    "@vitest/eslint-plugin": "^1.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^16.0.0",
    "eslint-plugin-simple-import-sort": "^12.0.0",
    "eslint-plugin-storybook": "^10.0.0"
  }
}
```

`**packages/next-eslint-config/index.mjs**` - Export a flat config array that consumers spread:

```javascript
import vitest from '@vitest/eslint-plugin'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import storybook from 'eslint-plugin-storybook'

export default [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      '@vitest': vitest,
      'simple-import-sort': simpleImportSort,
    },
    rules: { /* your rules */ },
    settings: {
      'import/resolver': { node: true, typescript: true },
      react: { version: 'detect' },
    },
  },
]
```

## 3. Installing from GitHub

Once pushed, install in projects using the path syntax (works with npm, yarn, or pnpm):

```bash
# npm
npm install "github:YOUR_USERNAME/tacklebox#path:packages/next-eslint-config"

# pnpm
pnpm add "github:YOUR_USERNAME/tacklebox#path:packages/next-eslint-config"
```

Then in your project's `eslint.config.mjs`:

```javascript
import tackleboxConfig from '@tacklebox/next-eslint-config'

export default [
  // Project-specific ignores
  { ignores: ['generated-types/**', '.next/**'] },

  // Spread in tacklebox config
  ...tackleboxConfig,

  // Override or add rules as needed
  {
    rules: {
      'no-console': 'warn', // example override
    },
  },
]
```

## 4. Files to Create

- `pnpm-workspace.yaml` - Define workspace packages
- `package.json` - Root monorepo config
- `.gitignore` - Standard Node ignores
- `README.md` - Repo documentation
- `packages/next-eslint-config/package.json` - Package manifest with peer deps
- `packages/next-eslint-config/index.mjs` - Main config array export
- `packages/next-eslint-config/README.md` - Package usage docs

## Key Decisions

- **Array spread pattern**: Export a flat config array that consumers spread into their own config, allowing full flexibility to add ignores, override rules, or extend with additional configs
- **Peer dependencies**: ESLint plugins are peer deps since consumers need compatible versions in their projects
- **ESM only**: Using `.mjs` extension and `"type": "module"` for modern ESM support
- **Exact config copy**: The ESLint config will be copied exactly from the-verdant-veil (minus project-specific ignores), no modifications or rearrangements
- **Latest versions**: Peer dependency versions will be looked up at execution time to get the latest

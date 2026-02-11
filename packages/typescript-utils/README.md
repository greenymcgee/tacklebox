# @greenymcgee/typescript-utils

A collection of TypeScript utilities for use across projects.

## Installation

```bash
pnpm add @greenymcgee/typescript-utils
```

## Usage

### withCallbacks

See the original [blog post](https://www.robinwieruch.de/react-server-actions-toast-useactionstate/) for more details.

A wrapper for async server actions that invokes `onSuccess` or `onError`
callbacks based on the returned `ActionState` status.

```tsx
import { useActionState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ActionState, withCallbacks } from '@greenymcgee/typescript-utils'

import { createUser as createUserAction } from '../actions'

const initialState: ActionState = { status: 'IDLE' }

function CreateUserForm() {
  const router = useRouter()

  const callbacks = useMemo(
    () => ({
      onEnd(id: string) {
        toast.dismiss(id)
      },
      onError(state: ActionState) {
        toast.error('Failed to create user')
        console.error('Failed to create user', state)
      },
      onSuccess(state: ActionState) {
        toast.success('User created')
        console.log('User created', state)
        router.push('/users')
      },
      onStart() {
        return toast.loading('Creating user...')
      },
    }),
    [router],
  )

  const [, createUser, creatingUser] = useActionState(
    withCallbacks(createUserAction, callbacks),
    initialState,
  )

  return (
    <form action={createUser}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" />
      <button disabled={creatingUser} type="submit">
        {creatingUser ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
```

### ActionState

The interface that server actions must satisfy for `withCallbacks` to work.

```typescript
import type { ActionState } from '@greenymcgee/typescript-utils'

interface CreateUserState extends ActionState {
  data?: { id: string; name: string }
}
```

```typescript
interface ActionState {
  status: 'ERROR' | 'IDLE' | 'SUCCESS'
}
```

## Development

### Build

This package uses [tsup](https://tsup.egoist.dev/) to compile TypeScript
source files into ESM JavaScript and generate type declarations.

```bash
pnpm build
```

Output is written to `dist/`:

- `dist/index.js` -- compiled ESM bundle
- `dist/index.d.ts` -- TypeScript type declarations

### Lint

```bash
pnpm lint
```

### Test

```bash
pnpm test
```

Run tests with coverage:

```bash
pnpm test:coverage
```

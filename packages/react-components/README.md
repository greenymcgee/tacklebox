# @greenymcgee/react-components

Shared React components for this monorepo. Today the public API is a single component, **`Time`**, for displaying dates with correct semantics and flexible visible formatting.

## `Time`

`Time` renders a [native `<time>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time) so the value is both human-readable in the page and machine-readable for assistive tech, search, and scripts:

- **`dateTime`** is set automatically to an ISO 8601-style value with offset or `Z` (`yyyy-MM-dd'T'HH:mmXXX` via [date-fns `format`](https://date-fns.org/docs/format)) so the element carries a parseable instant.
- **Children** are the string produced by the same date with your **`format`** pattern (also date-fns), so you control the label (e.g. `MMMM d, yyyy`).

If `date` is missing or empty, the component returns `null` and renders nothing.

### Timezone

By default, **`convertedToLocalTimezone`** is `true` (default): the date is converted to the user's current timezone (via `date-fns-tz` and `Intl`) before formatting. Set it to `false` to format the value as a plain `Date` (no zone conversion) while still using the same `format` string for display.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `date` | `string \| null \| undefined` | — | Value to show; blank yields no output. |
| `format` | `string` | — | [date-fns `format` pattern](https://date-fns.org/docs/format) for the visible text. |
| `convertedToLocalTimezone` | `boolean` | `true` | When `true`, shift to the user’s local zone before formatting. |
| `…props` | `HTMLAttributes<HTMLTimeElement>` | — | Extra attributes; `dateTime` is not accepted (it is set by the component). |

### Install

The package is published as `@greenymcgee/react-components`. It expects you to use compatible versions of its peers:

- `react` / `react-dom`
- `date-fns`
- `date-fns-tz`

### Example

```tsx
import { Time } from '@greenymcgee/react-components'

export function PostMeta({ publishedAt }: { publishedAt: string }) {
  return (
    <p>
      Published <Time date={publishedAt} format="MMMM d, yyyy" />
    </p>
  )
}
```

```tsx
// Fixed calendar date string without shifting to the viewer’s zone
<Time
  date={raw}
  format="PPP"
  convertedToLocalTimezone={false}
/>
```

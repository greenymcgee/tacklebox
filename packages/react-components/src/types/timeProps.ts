import { HTMLAttributes } from 'react'

export type TimeProps = Omit<
  HTMLAttributes<HTMLTimeElement>,
  'children' | 'dateTime'
> & {
  convertedToLocalTimezone?: boolean
  date: string | undefined | null
  format: string
}

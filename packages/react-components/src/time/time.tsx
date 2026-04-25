import { format as formatMethod } from 'date-fns'
import { useMemo } from 'react'

import { TimeProps } from '../types/timeProps'
import { toCurrentTimezone } from './utils'

export function Time({
  convertedToLocalTimezone = true,
  date,
  format,
  ...props
}: TimeProps) {
  const converted = useMemo(() => {
    if (date === undefined || date === null || date === '') return null

    if (convertedToLocalTimezone) return toCurrentTimezone(date)

    return new Date(date)
  }, [convertedToLocalTimezone, date])

  if (!converted) return null

  return (
    <time
      dateTime={formatMethod(converted, "yyyy-MM-dd'T'HH:mmXXX")}
      {...props}
    >
      {formatMethod(converted, format)}
    </time>
  )
}

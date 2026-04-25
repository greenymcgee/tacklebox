import { toZonedTime } from 'date-fns-tz'

import { toCurrentTimezone } from '..'

describe('toCurrentTimezone', () => {
  it('should convert a UTC instant to the current timezone', () => {
    const date = '2025-02-27T06:54:00.000Z'
    const result = toCurrentTimezone(date)
    expect(result).toEqual(
      toZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone),
    )
  })
})

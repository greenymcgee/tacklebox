import { toZonedTime } from 'date-fns-tz'

export function toCurrentTimezone(date: Date | string | number) {
  return toZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
}

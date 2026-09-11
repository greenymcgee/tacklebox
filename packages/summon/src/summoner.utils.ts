type MergeType = Partial<Record<string, string>> | HeadersInit | undefined

type Params<ToBeMerged extends MergeType> = {
  headers: Headers
  toBeMerged: ToBeMerged
}

function buildEntries(toBeMerged: NonNullable<MergeType>) {
  if (toBeMerged instanceof Headers || Array.isArray(toBeMerged)) {
    return [...new Headers(toBeMerged).entries()]
  }

  return Object.entries(toBeMerged)
}

export function mergeHeaders<ToBeMerged extends MergeType>({
  headers,
  toBeMerged,
}: Params<ToBeMerged>) {
  if (!toBeMerged) return

  buildEntries(toBeMerged).forEach(([key, value]) => {
    if (value === undefined) return

    headers.set(key, value)
  })
}

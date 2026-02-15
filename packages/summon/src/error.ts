import type { SummonErrorOptions, SummonResponse } from './types'

/**
 * Extends the Error class and adds a "response" property set to a
 * SummonResponse.
 */
export class SummonError<Data> extends Error {
  public response: SummonResponse<Data>

  constructor(message?: string, options?: SummonErrorOptions<Data>) {
    const { response, ...rest } = options ?? ({} as SummonErrorOptions<Data>)
    super(message, rest)
    this.response = response ?? ({} as SummonResponse<Data>)
  }
}

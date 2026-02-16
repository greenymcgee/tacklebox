import { TryCatchResult } from './types/tryCatch'

export async function tryCatch<Response, CaughtError = Error>(
  promise: Promise<Response>,
): Promise<TryCatchResult<Response, CaughtError>> {
  try {
    const response = await promise
    return { error: null, response }
  } catch (error) {
    return { error: error as CaughtError, response: null }
  }
}

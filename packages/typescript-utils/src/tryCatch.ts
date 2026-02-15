interface Success<Response> {
  error: null
  response: Response
}

interface Failure<CaughtError> {
  error: CaughtError
  response: null
}

type Result<Response, CaughtError = Error> =
  | Success<Response>
  | Failure<CaughtError>

export async function tryCatch<Response, CaughtError = Error>(
  promise: Promise<Response>,
): Promise<Result<Response, CaughtError>> {
  try {
    const response = await promise
    return { error: null, response }
  } catch (error) {
    return { error: error as CaughtError, response: null }
  }
}

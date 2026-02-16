export interface TryCatchSuccess<Response> {
  error: null
  response: Response
}

export interface TryCatchFailure<CaughtError> {
  error: CaughtError
  response: null
}

export type TryCatchResult<Response, CaughtError = Error> =
  | TryCatchSuccess<Response>
  | TryCatchFailure<CaughtError>

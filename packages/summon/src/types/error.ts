import { SummonResponse } from './response'

export interface SummonError<Data> extends Error {
  cause: SummonResponse<Data>
}

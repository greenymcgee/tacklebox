import { SummonResponse } from './response'

export interface SummonErrorOptions<Data> extends ErrorOptions {
  response: SummonResponse<Data>
}

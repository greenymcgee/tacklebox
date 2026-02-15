import { SummonDELETEOptions } from './DELETEOptions'
import { SummonGETOptions } from './GETOptions'
import { SummonPATCHOptions } from './PATCHOptions'
import { SummonPOSTOptions } from './POSTOptions'

export type SummonRequestOptions<Params> =
  | SummonDELETEOptions<Params>
  | SummonGETOptions
  | SummonPATCHOptions<Params>
  | SummonPOSTOptions<Params>

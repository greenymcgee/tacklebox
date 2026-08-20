import { SummonDELETEOptions } from './DELETEOptions'
import { SummonGETOptions } from './GETOptions'
import { SummonPATCHOptions } from './PATCHOptions'
import { SummonPOSTOptions } from './POSTOptions'
import { SummonPUTOptions } from './PUTOptions'

export type SummonRequestOptions<Params> =
  | SummonDELETEOptions<Params>
  | SummonGETOptions
  | SummonPATCHOptions<Params>
  | SummonPOSTOptions<Params>
  | SummonPUTOptions<Params>

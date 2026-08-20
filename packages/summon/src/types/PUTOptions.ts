export interface SummonPUTOptions<Body> extends Omit<
  RequestInit,
  'body' | 'method'
> {
  body?: Body
}

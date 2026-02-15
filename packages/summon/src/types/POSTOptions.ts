export interface SummonPOSTOptions<Body> extends Omit<
  RequestInit,
  'body' | 'method'
> {
  body?: Body
}

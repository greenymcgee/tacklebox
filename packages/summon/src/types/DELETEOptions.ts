export interface SummonDELETEOptions<Body> extends Omit<
  RequestInit,
  'body' | 'method'
> {
  body?: Body
}

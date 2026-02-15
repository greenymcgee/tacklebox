export interface SummonPATCHOptions<Body> extends Omit<
  RequestInit,
  'body' | 'method'
> {
  body?: Body
}

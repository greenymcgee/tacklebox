export interface WithParams<Params> extends Omit<
  RequestInit,
  'body' | 'method'
> {
  body?: Params
}

export interface SummonResponse<Data> {
  data: Data
  headers: Record<string, string>
  ok: Response['ok']
  redirected: Response['redirected']
  status: Response['status']
  statusText: Response['statusText']
  type: Response['type']
  url: Response['url']
}

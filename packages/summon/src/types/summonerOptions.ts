export interface SummonerOptions {
  /**
   * A URL to prepend to every request.
   */
  baseURL?: string
  /**
   * Headers to apply to every request.
   */
  headers?: RequestInit['headers']
}

import { Summon } from './summon'
import type {
  SummonDELETEOptions,
  SummonerOptions,
  SummonGETOptions,
  SummonPATCHOptions,
  SummonPOSTOptions,
  SummonRequestOptions,
} from './types'

/**
 * An object that takes a set of options to apply to every fetch request.
 *
 * @example
 * const baseAPI = new Summoner({ baseURL: 'https://your-site.com' })
 *
 * // makes a GET request to https://your-site.com/posts
 * const { data } = await baseAPI.get<{ posts: Post[] }>('/posts')
 */
export class Summoner {
  private options: SummonerOptions

  constructor(options?: SummonerOptions) {
    this.options = options ?? {}
  }

  public async delete<Data, Params, ErrorType = Error>(
    pathname: string,
    options?: SummonDELETEOptions<Params>,
  ) {
    return await Summon.delete<Data, Params, ErrorType>(
      this.createURL(pathname),
      this.createRequest(options),
    )
  }

  public async get<Data, ErrorType = Error>(
    pathname: string,
    options?: SummonGETOptions,
  ) {
    return await Summon.get<Data, ErrorType>(
      this.createURL(pathname),
      this.createRequest(options),
    )
  }

  public async patch<Data, Params, ErrorType = Error>(
    pathname: string,
    options?: SummonPATCHOptions<Params>,
  ) {
    return await Summon.patch<Data, Params, ErrorType>(
      this.createURL(pathname),
      this.createRequest(options),
    )
  }

  public async post<Data, Params, ErrorType = Error>(
    pathname: string,
    options?: SummonPOSTOptions<Params>,
  ) {
    return await Summon.post<Data, Params, ErrorType>(
      this.createURL(pathname),
      this.createRequest(options),
    )
  }

  private addPersistedHeadersToOptions<Params>(
    headers: Headers,
    options: SummonRequestOptions<Params>,
  ) {
    new Headers(options.headers).forEach((value, key) => {
      return headers.set(key, value)
    })
    return { ...options, headers }
  }

  private get baseURL() {
    if (this.options.baseURL) return this.options.baseURL

    return ''
  }

  private createURL(pathname: string) {
    const { baseURL } = this
    if (baseURL) return `${baseURL}${pathname}`

    return pathname
  }

  /**
   * Grabs a new Headers object set to the instance headers, and adds any
   * additional headers provided for the given request.
   *
   * @param {SummonRequestOptions} options
   * @returns {SummonRequestOptions} options
   */
  private createRequest<Params>(
    options: SummonRequestOptions<Params> | undefined,
  ) {
    const { headers } = this
    if (!options) return { headers }

    return this.addPersistedHeadersToOptions(headers, options)
  }

  private get headers() {
    return new Headers(this.options.headers)
  }
}

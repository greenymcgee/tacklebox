import { Summon } from './summon'
import { mergeHeaders } from './summoner.utils'
import type {
  SummonDELETEOptions,
  SummonerOptions,
  SummonGETOptions,
  SummonPATCHOptions,
  SummonPOSTOptions,
  SummonRequestOptions,
} from './types'
import type { CommonHeaderType } from './types'

/**
 * An object that takes a set of options to apply to every fetch request.
 *
 * @example
 * const baseAPI = new Summoner({ baseURL: 'https://your-site.com' })
 *
 * // makes a GET request to https://your-site.com/posts
 * const { data } = await baseAPI.get<{ posts: Post[] }>('/posts')
 *
 * Default common headers are available to set headers on an instance after
 * initialization.
 *
 * @example
 * baseApi.defaults.headers.common.Authorization = `Bearer ${cookies.jwt}`
 */
export class Summoner {
  public defaults = {
    headers: { common: {} as Partial<Record<CommonHeaderType, string>> },
  }

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

  public async put<Data, Params, ErrorType = Error>(
    pathname: string,
    options?: SummonPOSTOptions<Params>,
  ) {
    return await Summon.put<Data, Params, ErrorType>(
      this.createURL(pathname),
      this.createRequest(options),
    )
  }

  private addPersistedHeadersToOptions<Params>(
    headers: Headers,
    options: SummonRequestOptions<Params>,
  ) {
    mergeHeaders({ headers, toBeMerged: options.headers })
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
    const { defaults, headers } = this
    mergeHeaders({ headers, toBeMerged: defaults.headers.common })
    if (!options) return { headers }

    return this.addPersistedHeadersToOptions(headers, options)
  }

  private get headers() {
    return new Headers(this.options.headers)
  }
}

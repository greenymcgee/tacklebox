import { SummonResponseBuilder } from './responseBuilder'
import type {
  SummonDELETEOptions,
  SummonGETOptions,
  SummonPATCHOptions,
  SummonPOSTOptions,
  SummonPUTOptions,
  WithParams,
} from './types'
import { stringifyJSON, tryPromise } from './utils'

/**
 * A wrapper for fetch. Includes methods for DELETE, GET, PATCH, POST, and PUT
 * requests.
 *
 * @example
 * try {
 *   const { data } = await Summon.get<{ posts: Post[] }>('https://your-site.com/posts')
 *   return data.posts
 * } catch (error) {
 *   logger.error(error, error.message)
 *   return error.response.data.message
 * }
 */
export class Summon {
  /**
   * Takes the response and creates a SummonResponse or a SummonError based on
   * the response.ok.
   *
   * @param {Response} response
   * @returns SummonResponse
   */
  public static async createResponse<Data, ErrorData = unknown>(
    response: Response,
  ) {
    const builder = new SummonResponseBuilder<Data, ErrorData>(response)
    if (response.ok) return await builder.buildSuccess()

    throw await builder.buildError()
  }

  public static async delete<Data, Params, ErrorData = unknown>(
    url: string,
    options?: SummonDELETEOptions<Params>,
  ) {
    const params = this.stringifyParams('DELETE', options)
    const response = await tryPromise(fetch(url, params))
    return await this.createResponse<Data, ErrorData>(response)
  }

  public static async get<Data, ErrorData = unknown>(
    url: string,
    options?: SummonGETOptions,
  ) {
    const response = await tryPromise(fetch(url, { method: 'GET', ...options }))
    return await this.createResponse<Data, ErrorData>(response)
  }

  public static async patch<Data, Params, ErrorData = unknown>(
    url: string,
    options?: SummonPATCHOptions<Params>,
  ) {
    const params = this.stringifyParams('PATCH', options)
    const response = await tryPromise(fetch(url, params))
    return await this.createResponse<Data, ErrorData>(response)
  }

  public static async post<Data, Params, ErrorData = unknown>(
    url: string,
    options?: SummonPOSTOptions<Params>,
  ) {
    const params = this.stringifyParams('POST', options)
    const response = await tryPromise(fetch(url, params))
    return await this.createResponse<Data, ErrorData>(response)
  }

  public static async put<Data, Params, ErrorData = unknown>(
    url: string,
    options?: SummonPUTOptions<Params>,
  ) {
    const params = this.stringifyParams('PUT', options)
    const response = await tryPromise(fetch(url, params))
    return await this.createResponse<Data, ErrorData>(response)
  }

  private static stringifyParams<Params>(
    method: 'DELETE' | 'PATCH' | 'POST' | 'PUT',
    options: WithParams<Params> | undefined,
  ): RequestInit {
    if (!options) return {}

    const { body, ...rest } = options
    const stringified = stringifyJSON(body)
    if (stringified instanceof Error) throw stringified

    return { ...rest, body: stringified, method }
  }
}

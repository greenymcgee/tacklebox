import { SummonResponseBuilder } from './responseBuilder'
import type {
  SummonDELETEOptions,
  SummonGETOptions,
  SummonPATCHOptions,
  SummonPOSTOptions,
  WithParams,
} from './types'

/**
 * A wrapper for fetch. Includes methods for DELETE, GET, PATCH, and POST
 * requests.
 *
 * @example
 * try {
 *   const { data } = await Summon.get<{ posts: Post[] }>('https://your-site.com/posts')
 *   return data.posts
 * } catch (error) {
 *   logger.error(error.cause, error.message)
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
    return await fetch(url, this.stringifyParams('DELETE', options)).then(
      async (response) => await this.createResponse<Data, ErrorData>(response),
    )
  }

  public static async get<Data, ErrorData = unknown>(
    url: string,
    options?: SummonGETOptions,
  ) {
    return await fetch(url, { method: 'GET', ...options }).then(
      async (response) => await this.createResponse<Data, ErrorData>(response),
    )
  }

  public static async patch<Data, Params, ErrorData = unknown>(
    url: string,
    options?: SummonPATCHOptions<Params>,
  ) {
    return await fetch(url, this.stringifyParams('PATCH', options)).then(
      async (response) => await this.createResponse<Data, ErrorData>(response),
    )
  }

  public static async post<Data, Params, ErrorData = unknown>(
    url: string,
    options?: SummonPOSTOptions<Params>,
  ) {
    return await fetch(url, this.stringifyParams('POST', options)).then(
      async (response) => await this.createResponse<Data, ErrorData>(response),
    )
  }

  private static stringifyParams<Params>(
    method: 'DELETE' | 'PATCH' | 'POST',
    options: WithParams<Params> | undefined,
  ): RequestInit {
    if (!options) return {}

    const { body, ...rest } = options
    return { ...rest, body: JSON.stringify(body), method }
  }
}

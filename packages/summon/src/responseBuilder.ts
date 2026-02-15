import { SummonError } from './error'
import { SummonResponse } from './types'

/**
 * An object that is responsible for creating SummonResponses.
 *
 * @param {Response} response
 */
export class SummonResponseBuilder<Data, ErrorData> {
  public response: Response

  constructor(response: Response) {
    this.response = response
  }

  /**
   * Builds a SummonError using with typed data set to the response.
   *
   * @returns {Promise<SummonError<ErrorData>>} Promise => SummonError
   */
  public async buildError(): Promise<SummonError<ErrorData>> {
    return new SummonError(this.response.statusText, {
      response: await this.buildResponse<ErrorData>(),
    })
  }

  /**
   * Builds a headers object using the response.headers.entries().
   *
   * @returns {{}} {}
   */
  public buildHeaders() {
    return Object.fromEntries(this.response.headers.entries())
  }

  /**
   * Builds a SummonResponse with data based on the response.body.
   *
   * @returns {SummonResponse<ResponseData>} SummonResponse
   */
  public async buildResponse<ResponseData>(): Promise<
    SummonResponse<ResponseData>
  > {
    return {
      data: this.parseJSON(await this.body()),
      headers: this.buildHeaders(),
      ok: this.response.ok,
      redirected: this.response.redirected,
      status: this.response.status,
      statusText: this.response.statusText,
      type: this.response.type,
      url: this.response.url,
    }
  }

  /**
   * Builds a successful SummonResponse with typed data.
   *
   * @returns {Promise<SummonResponse<Data>>} Promise => SummonResponse
   */
  public async buildSuccess(): Promise<SummonResponse<Data>> {
    return await this.buildResponse<Data>()
  }

  private async body() {
    if (this.contentType.includes('application/json'))
      return await this.response.json()

    return await this.response.text()
  }

  /**
   * Ignored by tests because responses have content-type by default, but safer
   * to default to a string.
   */
  private get contentType() {
    /* v8 ignore start */
    return this.response.headers.get('content-type') ?? ''
    /* v8 ignore stop */
  }

  private parseJSON(json: string) {
    try {
      return JSON.parse(json)
    } catch {
      return json
    }
  }
}

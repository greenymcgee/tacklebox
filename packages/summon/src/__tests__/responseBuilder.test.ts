import { SummonResponseBuilder } from '../responseBuilder'

describe('SummonResponseBuilder', () => {
  describe('buildError', () => {
    it('should build an error and set the response to a SummonResponse', async () => {
      const text = 'text'
      const builder = new SummonResponseBuilder(
        new Response(text, { status: 400, statusText: 'Bad Request' }),
      )
      expect((await builder.buildError()).response).toEqual({
        data: 'text',
        headers: { 'content-type': 'text/plain;charset=UTF-8' },
        ok: false,
        redirected: false,
        status: 400,
        statusText: 'Bad Request',
        type: 'default',
        url: '',
      })
    })
  })

  describe('buildHeaders', () => {
    it('should build the headers in a new object', () => {
      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
      }
      const builder = new SummonResponseBuilder(
        new Response('text', { headers }),
      )
      expect(builder.buildHeaders()).toEqual(headers)
    })
  })

  describe('buildResponse', () => {
    it('should build a SummonResponse with parsed JSON when body is valid JSON', async () => {
      const data = JSON.stringify({ message: 'error' })
      const responseInit: ResponseInit = {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        status: 422,
        statusText: 'Unprocessable content',
      }
      const builder = new SummonResponseBuilder(
        new Response(data, responseInit),
      )
      expect(await builder.buildResponse()).toEqual({
        data: JSON.parse(data),
        headers: responseInit.headers,
        ok: false,
        redirected: false,
        status: responseInit.status,
        statusText: responseInit.statusText,
        type: 'default',
        url: '',
      })
    })

    it('should build a SummonResponse with text when body is not valid JSON', async () => {
      const data = 'data'
      const responseInit: ResponseInit = {
        headers: { 'content-type': 'text/plain' },
        status: 422,
        statusText: 'Unprocessable content',
      }
      const builder = new SummonResponseBuilder(
        new Response(data, responseInit),
      )
      expect(await builder.buildResponse()).toEqual({
        data,
        headers: responseInit.headers,
        ok: false,
        redirected: false,
        status: responseInit.status,
        statusText: responseInit.statusText,
        type: 'default',
        url: '',
      })
    })
  })

  describe('buildSuccess', () => {
    it('should build a successful SummonResponse', async () => {
      const json = JSON.stringify({ message: 'good' })
      const builder = new SummonResponseBuilder(
        new Response(json, {
          headers: { 'content-type': 'application/json' },
          status: 200,
          statusText: 'Success',
        }),
      )
      expect(await builder.buildSuccess()).toEqual({
        data: { message: 'good' },
        headers: { 'content-type': 'application/json' },
        ok: true,
        redirected: false,
        status: 200,
        statusText: 'Success',
        type: 'default',
        url: '',
      })
    })
  })
})

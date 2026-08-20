import { SummonError } from '../error'
import { SummonResponseBuilder } from '../responseBuilder'
import { Summon } from '../summon'

const fetchMock = vi.fn(() => Promise.resolve(new Response('{}')))

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal('fetch', fetchMock)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('Summon', () => {
  describe('createResponse', () => {
    it('should create a success SummonResponse for an ok Response', async () => {
      const args: ConstructorParameters<typeof Response> = [
        '{ "key": "value" }',
        {
          headers: { 'content-type': 'application/json' },
          status: 200,
          statusText: 'Success',
        },
      ]
      const response = new Response(...args)
      const result = await Summon.createResponse(response)
      const builder = new SummonResponseBuilder(new Response(...args))
      expect(result).toEqual(await builder.buildSuccess())
    })

    it('should create a SummonError for an error response', async () => {
      const args: ConstructorParameters<typeof Response> = [
        '{ "key": "value" }',
        {
          headers: { 'content-type': 'application/json' },
          status: 500,
          statusText: 'Internal server error',
        },
      ]
      const response = new Response(...args)
      const result = async () => await Summon.createResponse(response)
      const builder = new SummonResponseBuilder(new Response(...args))
      const expectedResponse = new Response(...args)
      await expect(result).rejects.toThrow(
        new SummonError(expectedResponse.statusText, {
          response: await builder.buildResponse(),
        }),
      )
    })
  })

  describe('delete', () => {
    it('should call fetch with the url and the method set to DELETE and pass the options', async () => {
      const url = 'http://nothing.no.greeny'
      const options = {
        body: { key: 'value' },
        headers: { 'content-type': 'application/json' },
      }
      await Summon.delete(url, options)
      expect(fetchMock).toHaveBeenCalledWith(url, {
        ...options,
        body: JSON.stringify(options.body),
        method: 'DELETE',
      })
    })

    it('should return a SummonResponse', async () => {
      const url = 'http://nothing.no.greeny'
      const result = await Summon.delete(url)
      expect(result).toEqual(await Summon.createResponse(new Response('{}')))
    })

    it('should throw a SummonError for invalid JSON', async () => {
      const url = 'http://nothing.no.greeny'
      const circular: Record<string, unknown> = {}
      circular.self = circular
      const result = async () => await Summon.delete(url, { body: circular })
      await expect(result).rejects.toThrow(SummonError)
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })

  describe('get', () => {
    it('should call fetch with the url and the method set to GET and pass the options', async () => {
      const url = 'http://nothing.no.greeny'
      const options = { headers: { 'content-type': 'application/json' } }
      await Summon.get(url, options)
      expect(fetchMock).toHaveBeenCalledWith(url, { method: 'GET', ...options })
    })

    it('should return a SummonResponse', async () => {
      const url = 'http://nothing.no.greeny'
      const result = await Summon.get(url)
      expect(result).toEqual(await Summon.createResponse(new Response('{}')))
    })
  })

  describe('patch', () => {
    it('should call fetch with the url and the method set to PATCH and pass the options', async () => {
      const url = 'http://nothing.no.greeny'
      const options = {
        body: { key: 'value' },
        headers: { 'content-type': 'application/json' },
      }
      await Summon.patch(url, options)
      expect(fetchMock).toHaveBeenCalledWith(url, {
        ...options,
        body: JSON.stringify(options.body),
        method: 'PATCH',
      })
    })

    it('should return a SummonResponse', async () => {
      const url = 'http://nothing.no.greeny'
      const result = await Summon.patch(url)
      expect(result).toEqual(await Summon.createResponse(new Response('{}')))
    })

    it('should throw a SummonError for invalid JSON', async () => {
      const url = 'http://nothing.no.greeny'
      const circular: Record<string, unknown> = {}
      circular.self = circular
      const result = async () => await Summon.patch(url, { body: circular })
      await expect(result).rejects.toThrow(SummonError)
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })

  describe('post', () => {
    it('should call fetch with the url and the method set to POST and pass the options', async () => {
      const url = 'http://nothing.no.greeny'
      const options = {
        body: { key: 'value' },
        headers: { 'content-type': 'application/json' },
      }
      await Summon.post(url, options)
      expect(fetchMock).toHaveBeenCalledWith(url, {
        ...options,
        body: JSON.stringify(options.body),
        method: 'POST',
      })
    })

    it('should return a SummonResponse', async () => {
      const url = 'http://nothing.no.greeny'
      const result = await Summon.post(url)
      expect(result).toEqual(await Summon.createResponse(new Response('{}')))
    })

    it('should throw a SummonError for invalid JSON', async () => {
      const url = 'http://nothing.no.greeny'
      const circular: Record<string, unknown> = {}
      circular.self = circular
      const result = async () => await Summon.post(url, { body: circular })
      await expect(result).rejects.toThrow(SummonError)
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })

  describe('put', () => {
    it('should call fetch with the url and the method set to PUT and pass the options', async () => {
      const url = 'http://nothing.no.greeny'
      const options = {
        body: { key: 'value' },
        headers: { 'content-type': 'application/json' },
      }
      await Summon.put(url, options)
      expect(fetchMock).toHaveBeenCalledWith(url, {
        ...options,
        body: JSON.stringify(options.body),
        method: 'PUT',
      })
    })

    it('should return a SummonResponse', async () => {
      const url = 'http://nothing.no.greeny'
      const result = await Summon.put(url)
      expect(result).toEqual(await Summon.createResponse(new Response('{}')))
    })

    it('should throw a SummonError for invalid JSON', async () => {
      const url = 'http://nothing.no.greeny'
      const circular: Record<string, unknown> = {}
      circular.self = circular
      const result = async () => await Summon.put(url, { body: circular })
      await expect(result).rejects.toThrow(SummonError)
      expect(fetchMock).not.toHaveBeenCalled()
    })
  })
})

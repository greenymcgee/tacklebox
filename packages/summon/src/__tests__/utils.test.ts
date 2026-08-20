import { SummonError } from '../error'
import { tryPromise } from '../utils'

describe('tryPromise', () => {
  it('should return the resolved value when the promise resolves', async () => {
    const result = await tryPromise(Promise.resolve('value'))
    expect(result).toBe('value')
  })

  it('should rethrow a SummonError unchanged when the promise rejects with one', async () => {
    const summonError = new SummonError('Internal server error', {
      response: {
        data: { message: 'Internal server error' },
        headers: {},
        ok: false,
        redirected: false,
        status: 500,
        statusText: 'Internal server error',
        type: 'default',
        url: 'http://nothing.no.greeny',
      },
    })
    const result = tryPromise(Promise.reject(summonError))
    await expect(result).rejects.toBe(summonError)
  })

  it('should wrap a non-SummonError Error in a SummonError', async () => {
    const fetchError = new TypeError('fetch failed')
    const result = tryPromise(Promise.reject(fetchError))
    await expect(result).rejects.toBeInstanceOf(SummonError)
    await expect(result).rejects.toMatchObject({ message: 'fetch failed' })
  })

  it('should preserve the original error as the cause', async () => {
    const fetchError = new TypeError('fetch failed')
    const result = tryPromise(Promise.reject(fetchError))
    await expect(result).rejects.toMatchObject({ cause: fetchError })
  })

  it('should attach a response that reflects failure', async () => {
    const fetchError = new TypeError('fetch failed')
    const result = tryPromise(Promise.reject(fetchError))
    await expect(result).rejects.toMatchObject({
      response: {
        data: undefined,
        headers: {},
        ok: false,
        redirected: false,
        status: 0,
        statusText: '',
        type: 'error',
        url: '',
      },
    })
  })

  it('should use a generic message and omit the cause when a non-Error is thrown', async () => {
    const result = tryPromise(Promise.reject('not an error'))
    await expect(result).rejects.toBeInstanceOf(SummonError)
    await expect(result).rejects.toMatchObject({
      cause: undefined,
      message: 'Unexpected error',
    })
  })
})

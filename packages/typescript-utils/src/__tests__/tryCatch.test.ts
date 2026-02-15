import { tryCatch } from '..'

describe('tryCatch', () => {
  it('should return a response upon success', async () => {
    const response = JSON.stringify({ message: 'success' })
    const result = await tryCatch(Promise.resolve(response))
    expect(result).toEqual({ error: null, response })
  })

  it('should return an error upon failure', async () => {
    const error = new Error('error')
    const result = await tryCatch(Promise.reject(error))
    expect(result).toEqual({ error, response: null })
  })
})

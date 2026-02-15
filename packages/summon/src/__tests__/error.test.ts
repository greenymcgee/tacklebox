import { SummonError } from '../error'
import { SummonResponseBuilder } from '../responseBuilder'

describe('SummonError', () => {
  it('should gracefully handle empty arguments', () => {
    expect(new SummonError()).toBeInstanceOf(SummonError)
  })

  it('should set the response', async () => {
    const response = await new SummonResponseBuilder(
      new Response(),
    ).buildResponse()
    const error = new SummonError('Internal server error', { response })
    expect(error.response).toEqual(response)
  })
})

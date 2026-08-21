import { SummonError } from './error'

function getOrCreateSummonError(error: unknown, message: string) {
  if (error instanceof SummonError) return error

  const isErrorInstance = error instanceof Error
  return new SummonError(isErrorInstance ? error.message : message, {
    cause: isErrorInstance ? error : undefined,
    response: {
      data: {},
      headers: {},
      ok: false,
      redirected: false,
      status: 0,
      statusText: '',
      type: 'error',
      url: '',
    },
  })
}

export async function tryPromise<Data>(promise: Promise<Data>) {
  try {
    return await promise
  } catch (error) {
    throw getOrCreateSummonError(error, 'Unexpected error')
  }
}

export function stringifyJSON(body: unknown) {
  try {
    return JSON.stringify(body)
  } catch (error) {
    return getOrCreateSummonError(error, 'Unexpected JSON error')
  }
}

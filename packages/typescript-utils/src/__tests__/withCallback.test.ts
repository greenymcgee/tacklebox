import { withCallbacks } from '../withCallbacks'

const onEnd = vi.fn()
const onError = vi.fn()
const onSuccess = vi.fn()
const onStart = vi.fn()
const serverAction = vi.fn()

afterEach(() => vi.clearAllMocks())

describe('withCallbacks', () => {
  it('should call the serverAction', async () => {
    await withCallbacks(serverAction, {})()
    expect(serverAction).toHaveBeenCalledTimes(1)
  })

  it('should call the onStart callback', async () => {
    await withCallbacks(serverAction, { onStart })()
    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it('should call the onSuccess callback', async () => {
    serverAction.mockResolvedValue({ status: 'SUCCESS' })
    await withCallbacks(serverAction, { onSuccess })()
    expect(onSuccess).toHaveBeenCalledWith({ status: 'SUCCESS' })
  })

  it('should call the onEnd callback', async () => {
    const reference = { dismiss: vi.fn() }
    onStart.mockImplementation(() => reference)
    serverAction.mockResolvedValue({ status: 'SUCCESS' })
    await withCallbacks(serverAction, { onEnd, onStart })()
    expect(onEnd).toHaveBeenCalledWith(reference)
  })

  it('should call the onError callback', async () => {
    serverAction.mockResolvedValue({ status: 'ERROR' })
    await withCallbacks(serverAction, { onError })()
    expect(onError).toHaveBeenCalledWith({ status: 'ERROR' })
  })
})

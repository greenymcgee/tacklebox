import { ActionState } from './types/actionState'

type Callbacks<State, Reference = unknown> = {
  /**
   * Fires after the server action finishes. Can be useful for dismissing a
   * loading toast without the need for a useEffect.
   *
   * @param {Reference} reference - a toast id
   * @returns void
   */
  onEnd?: (reference: Reference) => void
  /**
   * Fires when the server action errors based on the "ERROR" status returned in
   * state.
   *
   * @param {State} state
   * @returns void
   */
  onError?: (state: State) => Promise<void> | void
  /**
   * Fires when the server action succeeds based on the "SUCCESS" status returned
   * in state.
   *
   * @param {State} state
   * @returns void
   */
  onSuccess?: (state: State) => Promise<void> | void
  /**
   * Fires before the server action starts. Useful for showing a toast while
   * awaiting the action and dismissing in the onEnd callback.
   *
   * @returns {Reference} reference - a toast id
   */
  onStart?: () => Reference
}

/**
 * Pass the server action with any of the callbacks to perform operations at
 * different points in the request lifecycle.
 *
 * @example
 * const [state, createUser, creatingUser] = useActionState(
 *   withCallbacks(createUserAction, { onSuccess: () => toast.success("Success") }),
 *   { status: 'IDLE' },
 * )
 *
 * @param serverAction
 * @param {Callbacks} callbacks
 * @returns () => Promise<State>
 */
export function withCallbacks<
  Args extends unknown[],
  State extends ActionState,
  Reference = unknown,
>(
  serverAction: (...args: Args) => Promise<State>,
  callbacks: Callbacks<State, Reference>,
): (...args: Args) => Promise<State> {
  return async (...args: Args) => {
    const promise = serverAction(...args)
    const reference = callbacks.onStart?.()
    const result = await promise

    if (reference) callbacks.onEnd?.(reference)

    if (result?.status === 'SUCCESS') await callbacks.onSuccess?.(result)

    if (result?.status === 'ERROR') await callbacks.onError?.(result)

    return promise
  }
}

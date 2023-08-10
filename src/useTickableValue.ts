import { useCallback, useRef } from 'react'

type Watcher = (newValue: number, oldValue: number) => void

/**
 * A hook for managing frequently updated values
 */
export const useTickableValue = (initial: number) => {
  /**
   * A ref to hold the value
   */
  const ref = useRef(initial)

  /**
   * A function to get the value
   */
  const get = useCallback(() => ref.current, [])

  /**
   * A function to set the value
   */
  const set = useCallback((to: number | ((v: number) => number)) => {
    const value = typeof to === 'function' ? to(ref.current) : to
    if (value === ref.current) return

    const oldValue = ref.current
    ref.current = value
    for (const watcher of watchersRef.current) {
      watcher(value, oldValue)
    }
  }, [])

  /**
   * A ref to hold the function for watching value changes
   */
  const watchersRef = useRef<Watcher[]>([])

  /**
   * A function to watch for value changes.
   * Returns a cleanup function.
   */
  const watch = useCallback((callback: Watcher): (() => void) => {
    /**
     * Do nothing if already registered (to prevent duplicate registration)
     */
    for (const watcher of watchersRef.current) {
      if (watcher === callback) return () => {}
    }

    /**
     * Register new one
     */
    watchersRef.current.push(callback)

    /**
     * Return a cleanup function
     */
    return () => {
      watchersRef.current = watchersRef.current.filter(
        (watcher) => watcher !== callback
      )
    }
  }, [])

  return { get, set, watch }
}

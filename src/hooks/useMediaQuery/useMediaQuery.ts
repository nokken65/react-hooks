import React from 'react'

type MediaQuery = string

/**
 * @description Returns a boolean
 *
 * @param {MediaQuery} query
 * The media query.
 *
 * @return {boolean}
 * A boolean value.
 *
 * @example
 * ```js
 * const isMatch = useMediaQuery("(max-width: 1024px)");
 * ```
 */
const useMediaQuery = (query: MediaQuery): boolean => {
  const subscribeMediaQuery = React.useCallback(
    (listener: VoidFunction) => subscribe(listener, query),
    [query]
  )

  const matches = React.useSyncExternalStore(
    subscribeMediaQuery,
    () => getSnapshot(query),
    getServerSnapshot
  )

  return matches
}

function getSnapshot(query: MediaQuery): boolean {
  return window.matchMedia(query).matches
}

function getServerSnapshot(): false {
  if (typeof window === 'undefined') {
    throw Error('useMediaQuery is a client-only hook')
  }

  return false
}

function subscribe(listener: VoidFunction, query: MediaQuery): VoidFunction {
  const mediaQueryList = window.matchMedia(query)

  mediaQueryList.addEventListener('change', listener)

  return () => {
    mediaQueryList.removeEventListener('change', listener)
  }
}

export { useMediaQuery }

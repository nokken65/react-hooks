import React from 'react'

/**
 * @description Returns a boolean.
 *
 * @return {boolean}
 * A boolean.
 *
 * @example
 * ```js
 * const isFirstRender = useIsFirstRender();
 * ```
 */
const useIsFirstRender = () => {
  const isFirst = React.useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export { useIsFirstRender }

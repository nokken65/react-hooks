import React from 'react'

/**
 * @description Returns a tuple containing a boolean value, function that toggles
 * its value and function that set its value. The initial boolean value defaults to false if not provided.
 *
 * @param {boolean} [initialValue=false]
 * The initial value of the boolean or undefined.
 *
 * @return {readonly [boolean, VoidFunction, React.Dispatch<React.SetStateAction<boolean>>]}
 * A tuple containing the boolean value, function that toggles its value and function that set its value.
 *
 * @example
 * ```js
 * const [value, toggle] = useToggle();
 * const [value, toggle] = useToggle(true);
 * const [value, toggle, setValue] = useToggle();
 * ```
 */
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = React.useState(initialValue)

  const toggle = React.useCallback(() => {
    setValue((v) => !v)
  }, [])

  return [value, toggle, setValue] as const
}

export { useToggle }

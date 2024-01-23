import { useMediaQuery } from '../useMediaQuery'

type PreferredColorScheme = 'light' | 'dark'

/**
 * @description Returns a preferred color scheme.
 *
 * @return {PreferredColorScheme}
 * A preferred color scheme.
 *
 * @example
 * ```js
 * const preferredColorScheme = usePreferredColorScheme();
 * ```
 */
const usePreferredColorScheme = () => {
  const isDarkColorScheme = useMediaQuery('(prefers-color-scheme: dark)')
  return isDarkColorScheme ? 'dark' : 'light'
}

export { usePreferredColorScheme }

export type { PreferredColorScheme }

import { useMediaQuery } from '../useMediaQuery'

type PreferredColorScheme = 'light' | 'dark'

const usePreferredColorScheme = () => {
  const isDarkColorScheme = useMediaQuery('(prefers-color-scheme: dark)')
  return isDarkColorScheme ? 'dark' : 'light'
}

export { usePreferredColorScheme }

export type { PreferredColorScheme }

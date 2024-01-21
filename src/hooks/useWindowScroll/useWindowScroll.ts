import React from 'react'

type Coords = { x: number; y: number }

type ScrollToOptions = {
  x?: Coords['x']
  y?: Coords['y']
  behavior?: ScrollBehavior
}

type XSelector = (x: Coords['x']) => Coords['x']
type YSelector = (y: Coords['y']) => Coords['y']

type UseWindowScrollConfig = {
  xSelector?: XSelector
  ySelector?: YSelector
}

const useWindowScroll = (config?: UseWindowScrollConfig) => {
  const { xSelector = (x: number) => x, ySelector = (y: number) => y } =
    config ?? {}

  const x = React.useSyncExternalStore(subscribe, () =>
    getScrollXSnapshot(xSelector)
  )
  const y = React.useSyncExternalStore(subscribe, () =>
    getScrollYSnapshot(ySelector)
  )

  const scrollTo = React.useCallback((options?: ScrollToOptions) => {
    window.scrollTo({
      left: options?.x,
      top: options?.y,
      behavior: options?.behavior
    })
  }, [])

  return [{ x, y }, scrollTo] as const
}

function getScrollXSnapshot(selector: XSelector) {
  return selector(window.scrollX)
}

function getScrollYSnapshot(selector: YSelector) {
  return selector(window.scrollY)
}

function subscribe(listener: VoidFunction) {
  window.addEventListener('scroll', listener)

  return () => {
    window.removeEventListener('scroll', listener)
  }
}

export { useWindowScroll }

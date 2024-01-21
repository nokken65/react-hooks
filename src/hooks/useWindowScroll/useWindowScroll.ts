import React from 'react'

import { id } from '@/utils'

type Coords = { x: number; y: number }

type ScrollToOptions = {
  x?: Coords['x']
  y?: Coords['y']
  behavior?: ScrollBehavior
}

type Selector = (value: Coords[keyof Coords]) => Coords[keyof Coords]

type UseWindowScrollConfig = {
  xSelector?: Selector
  ySelector?: Selector
}

const useWindowScroll = (config?: UseWindowScrollConfig) => {
  const { xSelector = id, ySelector = id } = config ?? {}

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

function getScrollXSnapshot(selector: Selector) {
  return selector(window.scrollX)
}

function getScrollYSnapshot(selector: Selector) {
  return selector(window.scrollY)
}

function subscribe(listener: VoidFunction) {
  window.addEventListener('scroll', listener)

  return () => {
    window.removeEventListener('scroll', listener)
  }
}

export { useWindowScroll }

import React from 'react'

type Coords = { x: number; y: number }

type ScrollToFn = ({
  x,
  y,
  behavior
}: {
  x?: Coords['x']
  y?: Coords['y']
  behavior?: ScrollBehavior
}) => void

const useWindowScroll = (): [
  { readonly x: number; readonly y: number },
  ScrollToFn
] => {
  const x = React.useSyncExternalStore(subscribe, getScrollXSnapshot)
  const y = React.useSyncExternalStore(subscribe, getScrollYSnapshot)

  const scrollTo: ScrollToFn = React.useCallback(({ x, y, behavior }) => {
    window.scrollTo({ left: x, top: y, behavior })
  }, [])

  return [{ x, y }, scrollTo] as const
}

function getScrollXSnapshot(): number {
  return window.scrollX
}

function getScrollYSnapshot(): number {
  return window.scrollY
}

function subscribe(listener: VoidFunction): VoidFunction {
  window.addEventListener('scroll', listener)

  return () => {
    window.removeEventListener('scroll', listener)
  }
}

export { useWindowScroll }

import { renderHook } from '@testing-library/react'

import { useIsFirstRender } from './useIsFirstRender'

describe('useIsFirstRender', () => {
  test('should be defined', () => {
    expect(useIsFirstRender).toBeDefined()
  })

  test('should return boolean', () => {
    const view = renderHook(() => useIsFirstRender())

    expect(view.result.current).toBeTypeOf('boolean')
  })

  test('should be initial true', () => {
    const view = renderHook(() => useIsFirstRender())

    expect(view.result.current).toBe(true)
  })

  test('should be false after rerender', () => {
    const view = renderHook(() => useIsFirstRender())

    expect(view.result.current).toBe(true)

    view.rerender()

    expect(view.result.current).toBe(false)
  })
})

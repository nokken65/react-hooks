import { act, renderHook } from '@testing-library/react'

import { useToggle } from './useToggle'

describe('useToggle', () => {
  test('should be defined', () => {
    expect(useToggle).toBeDefined()
  })

  test('should return tuple [boolean, func, func]', () => {
    const view = renderHook(() => useToggle())

    expect(view.result.current.length).toBe(3)
    expect(view.result.current[0]).toBeTypeOf('boolean')
    expect(view.result.current[1]).toBeTypeOf('function')
    expect(view.result.current[2]).toBeTypeOf('function')
  })

  test('should be default initial false', () => {
    const view = renderHook(() => useToggle())

    expect(view.result.current[0]).toBe(false)
  })

  test('should be setted initial', () => {
    const view = renderHook(() => useToggle(true))

    expect(view.result.current[0]).toBe(true)
  })

  test('should correct toggle', () => {
    const view = renderHook(() => useToggle())

    expect(view.result.current[0]).toBe(false)

    act(() => {
      view.result.current[1]()
    })

    expect(view.result.current[0]).toBe(true)
  })

  test('should correct setValue', () => {
    const view = renderHook(() => useToggle())

    expect(view.result.current[0]).toBe(false)

    act(() => {
      view.result.current[2](true)
    })

    expect(view.result.current[0]).toBe(true)
  })
})

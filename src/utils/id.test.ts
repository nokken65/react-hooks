import { id } from './id'

describe('Identity function', () => {
  test('should be defined', () => {
    expect(id).toBeDefined()
  })

  test('should returns the same value, which was used as its argument', () => {
    const identity = vi.fn(id)

    const value = 'test'

    const returnedValue = identity(value)

    expect(identity).toHaveBeenCalledOnce()
    expect(identity).toHaveLastReturnedWith(value)
    expect(returnedValue).toEqual(value)
  })
})

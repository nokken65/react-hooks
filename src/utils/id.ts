type IdentityFn = <T>(value: T) => T

const id: IdentityFn = (value) => value

export { id }
export type { IdentityFn }

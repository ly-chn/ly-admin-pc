/**
 * emit桥接
 */
export function useBridgeEmits<T extends string>(emits: (event: T, ...args: any[])=>void, enabledEmit: T[]) {
  const res = {} as Record<T, (...args: any[])=>void>
  for (const t of enabledEmit) {
    res[t] = (...args: any[])=>emits(t, ...args)
  }
  return res
}
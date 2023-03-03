import {computed} from 'vue'
import type {ComputedRef} from 'vue'

/**
 * 参数bool化
 * 顺序查找给定参数, 其中一个为true表示目标值为其key
 * @example
 * type P = {
 *   a: boolean
 *   b: boolean
 *   c: boolean
 *   d: 'a' | 'b' | 'c'
 * }
 * const p = {a: false, b: false, c: true, d: undefined}
 * const res = usePropBoolify(p, 'd', 'a', 'b', 'c') // (computed)'c'
 */
export function usePropBoolify<T extends Record<string, any>, K extends Extract<keyof T, string>>
(props: T, targetKey: K, ...values: T[K][]): ComputedRef<T[K]> {
  return computed(() => values.find(it => props[it]) ?? props[targetKey])
}
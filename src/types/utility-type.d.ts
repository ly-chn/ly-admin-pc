/**
 * 给类型加上前缀
 * @example
 * type Temp = 'name' | 'age'
 * type PrefixTemp = Prefix<'prefix_', Temp> // 'prefix_name' | 'prefix_age'
 */
export type Prefix<K extends string, T extends string> = `${K}${T}`;

/**
 * 给类型的key加上前缀
 * @example
 * type Temp = {
 *    name: string
 *    age: number
 * }
 * type PrefixRecordTemp = PrefixRecord<Temp, 'prefix_'> // { prefix_name: string, prefix_age: number }
 */
export type PrefixRecord<K, T extends string> = {
  [P in keyof K as Prefix<T, string & P>]: K[P];
}

/**
 * 获取所有key, 并添加指定前缀
 * @example
 * type Temp = {
 *   name: string
 *   age: number
 * }
 * type PrefixKeyTemp = PrefixKey<Temp, 'prefix_'> // 'prefix_name' | 'prefix_age'
 */
export type PrefixKey<K, T extends string> = keyof PrefixRecord<K, T>

/**
 * 基础树状结构
 */
export type BasicTree<T extends Record<any, any> = any> = {
  // 子节点
  children?: BasicTree<T>[]
} & T

/**
 * 获取值, 可能是函数或值类型, 注意: T不能是函数
 */
export type ValueGetter<T> = T extends ()=>any ? never : T | (() => T) | void

/**
 * 字符串分割
 * @example
 * type Temp = StrSplit<'a-b-c', '-'> // 'a' | 'b' | 'c'
 */
type StrSplitHelper<T extends string, D extends string, I extends string = never> = T extends '' ? never :
  T extends `${infer F}${D}${infer R}` ? StrSplitHelper<R, D, I | F> : I | T

export type StrSplit<T extends string, D extends string> = StrSplitHelper<T, D>

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
export type BasicTree<K extends string> = {
  [key in K]?: BasicTree<K>[]
}
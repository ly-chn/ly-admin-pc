import {describe, expect, it} from 'vitest'
import {IsInstance} from '@/util/is-instance'

describe('test is instance', () => {
  it('is function', () => expect(IsInstance.func(() => 1)).eq(true, 'must is function'))
  it('is not function', () => expect(IsInstance.func(1)).eq(false, 'must is not function'))
  it('is url', () => expect(IsInstance.url('https://www.baidu.com')).eq(true, 'must is url'))
  it('is not url', ()=>expect(IsInstance.url('hi')).eq(false, 'must is not url'))
})

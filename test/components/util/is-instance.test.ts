import {describe, expect, it} from 'vitest'
import {IsInstance} from '@/components/util/is-instance'

describe('test is instance', () => {
  it('function', () => expect(IsInstance.func(() => 1)).eq(true, 'must is function'))
  it('function', () => expect(IsInstance.func(1)).eq(false, 'must is function'))
})

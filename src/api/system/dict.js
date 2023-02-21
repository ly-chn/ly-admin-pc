import {rest} from '@/util/rest'

/**
 * 字典接口
 */
export const dictApi = {
  all() {
    return rest.get('sys-dict/all')
  },
  edit(record) {
    return rest.post('sys-dict/edit', record)
  },
  getById(id) {
    return rest.get(`sys-dict/${id}`)
  },

}
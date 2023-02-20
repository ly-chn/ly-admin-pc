import {rest} from '../../util/rest.js'

/**
 * 字典接口
 */
export const dictApi = {
  search(params) {
    return rest.get('sys-dict/search', {params})
  },
  edit(record) {
    return rest.post('sys-dict/edit', record)
  },
  getById(id) {
    return rest.get(`sys-dict/id${id}`)
  },
}
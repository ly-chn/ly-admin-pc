import {request} from '../../util/request'

/**
 * 字典接口
 */
export const dictApi = {
  search(params) {
    return request.get('sys-dict/search', {params})
  },
  edit(record) {
    return request.post('sys-dict/edit', record)
  },
  getById(id) {
    return request.get(`sys-dict/id${id}`)
  },
}
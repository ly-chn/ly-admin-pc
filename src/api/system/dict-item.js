import {rest} from '@/util/rest'

export const dictItemApi = {
  search(params) {
    return rest.get('sys-dict-item/search', {params})
  },
  edit(record) {
    return rest.post('sys-dict-item/edit', record)
  },
  getById(id) {
    return rest.get(`sys-dict-item/${id}`)
  },
  removeById(id) {
    return rest.delete(`sys-dict-item/${id}`)
  }
}
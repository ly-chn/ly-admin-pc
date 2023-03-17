import {rest} from '@/util/rest'

export const permissionApi = {
  all() {
    return rest.get('sys-permission/all')
  },
  edit(record) {
    return rest.post('sys-permission/edit', record)
  },
  getById(id) {
    return rest.get(`sys-permission/${id}`)
  },
  remove(id) {
    return rest.delete(`sys-permission/${id}`)
  },
}

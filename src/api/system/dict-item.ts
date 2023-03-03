import {rest} from '@/util/rest'
import type {LyDictItem} from '@/components/form/util/form-props'

export const dictItemApi = {
  search(params: any) {
    return rest.get('sys-dict-item/search', {params})
  },
  edit(record: any) {
    return rest.post('sys-dict-item/edit', record)
  },
  getById(id: string) {
    return rest.get(`sys-dict-item/${id}`)
  },
  remove(id: string) {
    return rest.delete(`sys-dict-item/remove/${id}`)
  },
  getByDictCode(dictCode: string){
    return rest.get<LyDictItem[]>(`sys-dict-item/code/${dictCode}`)
  }
}
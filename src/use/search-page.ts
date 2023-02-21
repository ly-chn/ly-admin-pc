import {type Ref, ref} from 'vue'
import LyTree from '@/components/tree/ly-tree.vue'
import LyForm from '@/components/form/form/ly-form.vue'

export interface SearchPageApi {
  search: (params: any) => Promise<any>
  edit?: (record: any) => Promise<any>
  getById: (id: string) => Promise<any>
  // todo: removeById
}

export interface SearchPageConfig {
  /**
   * 默认检索条件
   */
  defaultOrder?: {
    isAsc: 'asc' | 'desc',
    orderByColumn: string
  }
  /**
   * 检索之前
   * @param {Record<string, any>} params 整理的检索条件, 含分页/排序等
   * @return {any} 返回falsy的值将取消请求, 否则作为检索条件使用
   */
  beforeSearch?: (params: Record<string, any>) => any
  /**
   * 默认分页
   */
  defaultPaging?: Record<string, any>
  /**
   * 返回内容处理
   * @param res 检索请求返回值
   */
  resolveSearchRes?: (res: any) => void
}

/**
 * 分页信息
 * lyTodo: 移动到分页组件中
 */
export type Paging = {
  /**
   * 页码
   */
  pageNum?: number,
  /**
   * 分页大小
   */
  pageSize?: number,
  /**
   * 总数
   */
  total?: number
}

export type SearchPageContext<T = any> = {

  searchForm: Record<string, any>
  handleSearch: () => Promise<void>
  handleReset: () => void
  loading: Ref<boolean>
  paging: Ref<Paging>
  tableData: Ref<T[]>
  handleEdit: (recordId: string) => void
  record: any
}

export function useSearchPage(api: SearchPageApi, config: SearchPageConfig = {}): SearchPageContext {
  const {
    defaultOrder = {isAsc: 'desc', orderByColumn: 'createTime'},
    beforeSearch = (v: any) => v,
    defaultPaging = {}
  } = config
  const searchForm = ref<Record<string, any>>({})
  const paging = ref<Paging>({...defaultPaging})
  const tableData = ref()
  const loading = ref(false)
  const editing = ref(false)
  const record = ref()
  const handleSearch = async () => {
    loading.value = true
    const params = beforeSearch({...defaultOrder, ...defaultPaging, ...searchForm.value})
    if (!params) {
      loading.value = false
      return void console.log('取消请求')
    }
    const {pageNum, pageSize, total, list} = await api.search(params).finally(() => loading.value = false)
    paging.value = {pageNum, pageSize, total}
    tableData.value = list
  }
  const handleReset = async () => {
    paging.value.pageSize = undefined
    paging.value.pageNum = 1
    await handleSearch()
  }
  handleReset()
  const handleEdit = async (recordAble?: any) => {
    editing.value = true
    if (!recordAble) {
      record.value = {}
    }else if (typeof recordAble === 'string') {
      record.value = await api.getById(recordAble)
    } else {
      record.value = {}
    }
  }

  const handleSubmit = async (formRef: Ref<InstanceType<typeof LyForm>>) => {
    await  formRef.value?.validate()

  }
  return {
    searchForm,
    handleSearch,
    handleReset,
    loading,
    paging,
    tableData,
    handleEdit,
    record
  }
}

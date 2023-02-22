import {type Ref, ref} from 'vue'
import {inject} from 'vue'
import {ElMessage} from 'element-plus'
import type LyForm from '@/components/form/form/ly-form.vue'
import {searchAreaCtxKey} from '@/components/area/area-ctx'
import {watchEffect} from 'vue'

export interface SearchPageApi {
  search: (params: any) => Promise<any>
  edit?: (record: any) => Promise<any>
  getById?: (id: string) => Promise<any>
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

/**
 * 检索页上下文
 */
export type SearchPageContext<T = any> = {
  /**
   * 检索表单
   */
  searchForm: Ref<Record<string, any>>
  /**
   * 执行检索
   */
  handleSearch: () => Promise<void>
  /**
   * 重置检索条件
   */
  handleReset: () => Promise<void>
  /**
   * 检索loading状态, 用于表格, 检索/重置按钮
   */
  loading: Ref<boolean>
  /**
   * 检索的分页信息
   */
  paging: Ref<Paging>
  /**
   * 检索结果-列表数据
   */
  tableData: Ref<T[]>

  /**
   * 当前正在编辑的对象
   */
  record: any
  /**
   * 当前编辑状态
   */
  editing: Ref<boolean>
  /**
   * 点击新增/修改时的事件
   * @param {string} recordId 不存在时表示新增, 否则表示修改, 传字符串将getById, 否则直接使用
   * @return {Promise<void>}
   */
  handleEdit: (recordAble: any) => Promise<void>
  /**
   * 新增/修改完成
   * @param {Ref<InstanceType<typeof LyForm>>} formRef 表单存在则自动执行校验
   */
  handleSubmit: (formRef?: Ref<InstanceType<typeof LyForm>>) => Promise<void>
}

/**
 * 用于快速构建检索页面逻辑操作
 * @param api 所需api, 检索, 修改, 通过id查找, 批量删除
 * @param config
 * @return {SearchPageContext}
 */
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
    if (!recordAble) {
      record.value = {}
    } else if (typeof recordAble === 'string') {
      if (!api.getById) {
        throw Error('无法执行编辑操作: 需提供api: getById')
      }
      record.value = await api.getById(recordAble)
    } else {
      record.value = {}
    }
    editing.value = true
  }

  const handleSubmit = async (formRef?: Ref<InstanceType<typeof LyForm>>) => {
    if (!api.edit) {
      throw Error('需提供edit api')
    }
    await formRef?.value?.validate()
    await api.edit?.(record.value)
    ElMessage.success(record.value?.id ? '已修改' : '已添加')
  }
  return {
    searchForm,
    handleSearch,
    handleReset,
    loading,
    paging,
    tableData,
    record,
    editing,
    handleEdit,
    handleSubmit
  }
}

export function useSearchPageEdit(formRef?: Ref<InstanceType<typeof LyForm>>) {
  const searchCtx = inject(searchAreaCtxKey, null)
  if (!searchCtx) {
    throw Error('需置于检索表单上下文之中')
  }
  watchEffect(()=>{
    if (searchCtx.editing.value) {
      formRef?.value?.clearValidate()
    }
  })
  const handleOk = async ()=>{
    await searchCtx.handleSubmit(formRef)
  }
  return {
    editing: searchCtx.editing,
    record: searchCtx.record,
    handleOk
  }
}
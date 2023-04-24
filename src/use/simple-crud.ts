import {type Ref, ref} from 'vue'
import {inject} from 'vue'
import {watchEffect} from 'vue'
import {ElMessage} from 'element-plus'
import type LyForm from '@/components/form/form/ly-form.vue'
import {searchAreaCtxKey} from '@/components/area/area-ctx'
import type {PagingVO} from '#/rest'
import type {DataRecord} from '#/rest'

export interface CrudApi {
  // 分页查询
  search?<P = unknown, T extends DataRecord = DataRecord>(params: P): Promise<PagingVO<T>>
  // 新增/修改
  edit?<P = unknown, R = void>(record: P): Promise<R>
  // 通过id获取单条
  getById?<T = DataRecord>(id: string | number): Promise<T>
  // 获取全部
  all?<T = DataRecord>(): Promise<T[]>
  // 通过id/id列表批量删除
  remove?(id: string | string[]): Promise<void>
}

export interface CrudConfig {
  // 默认排序
  defaultOrder?: {
    isAsc: 'asc' | 'desc',
    orderByColumn: string
  }
  // 为true表示拒绝分页, 将修改search方法调用为all方法调用
  noPaging?: boolean
  // 默认分页
  defaultPaging?: Record<string, unknown>
  // 仅仅一个标识, 无具体左右, 值随意, debug可能会用到
  name?: string
  /**
   * 检索之前钩子
   * @param {Record<string, unknown>} params 整理的检索条件, 含分页/排序等
   * @return {unknown} 返回falsy的值将取消请求, 否则作为检索条件使用
   */
  beforeSearch?(params: Record<string, unknown>): unknown
  /**
   * 点击编辑按钮之后, 打开弹窗之前, 此时record已完成初始化
   */
  beforeEdit?<T extends DataRecord>(record: Ref<T>): void
  // 修改后钩子
  afterEdit?(): void
}

/**
 * 分页信息
 * lyTodo: 移动到分页组件中
 */
export type Paging = {
  // 页码
  pageNum?: number,
  // 分页大小
  pageSize?: number,
  // 总数
  total?: number
}

/**
 * 检索页上下文
 */
export type CrudContext<T extends DataRecord = DataRecord> = {
  // 仅仅一个标识, 无具体左右, 值随意, debug可能会用到
  name: CrudConfig['name']
  // 检索表单
  searchForm: Ref<Record<string, unknown>>
  // 执行检索
  handleSearch: () => Promise<void>
  // 重置检索条件
  handleReset: () => Promise<void>
  // 检索loading状态, 用于表格, 检索/重置按钮
  loading: Ref<boolean>
  // 检索的分页信息
  paging: Ref<Paging>
  // 检索结果-列表数据
  tableData: Ref<T[]>

  // 当前正在编辑的对象
  record: Ref<T>
  // 当前编辑状态
  editing: Ref<boolean>
  // 当前数据提交loading状态
  updating: Ref<boolean>
  /**
   * 点击新增/修改时的事件
   * @param {string} recordAble 不存在时表示新增, 否则表示修改, 传字符串将getById, 否则直接使用
   * @return {Promise<void>}
   */
  handleEdit(recordAble?: unknown): Promise<void>
  /**
   * 新增/修改完成
   * @param {Ref<InstanceType<typeof LyForm>>} formRef 表单存在则自动执行校验
   */
  handleSubmit(formRef?: Ref<InstanceType<typeof LyForm>>): Promise<void>
  /**
   *
   * @param {string | string[]} id
   * @return {Promise<void>}
   */
  handleRemove(id: string | string[]): Promise<void>
}

/**
 * 检索页面-编辑弹窗上下文
 */
export type CrudEditContext<T> = {
  // 仅仅一个标识, 无具体左右, 值随意, debug可能会用到
  name: CrudConfig['name']
  // 当前编辑状态
  editing: Ref<boolean>
  // 当前数据提交loading状态
  updating: Ref<boolean>
  // 当前编辑的对象
  record: Ref<T>
  // 提交事件处理
  handleOk(): Promise<void>
}

/**
 * 用于快速构建检索页面逻辑操作
 * tableData和record数据存在不同的可能性(并且不小), 但是为了减少心智负担, 搞成了一个类型
 * @param api 所需api, 检索, 修改, 通过id查找, 批量删除
 * @param config
 * @return {CrudContext}
 */
export function useCrud<T extends DataRecord>(api: CrudApi, config: CrudConfig = {}): CrudContext<T> {
  const {
    defaultOrder = {isAsc: 'desc', orderByColumn: 'createTime'},
    beforeSearch = v => v,
    defaultPaging = {}
  } = config
  const searchForm = ref<Record<string, unknown>>({})
  const paging = ref<Paging>({...defaultPaging})
  const tableData: Ref<T[]> = ref([])
  const loading = ref(false)
  const editing = ref(false)
  const updating = ref(false)
  const record = ref<T>() as Ref<T>
  const handleSearch = async () => {
    const params = beforeSearch({...defaultOrder, ...defaultPaging, ...searchForm.value})
    if (!params) {
      return void console.debug('取消请求')
    }
    loading.value = true
    try {
      if (!config.noPaging && api.search) {
        const {pageNum, pageSize, total, list} = await api.search(params)
        paging.value = {pageNum, pageSize, total}
        tableData.value = list as T[]
      } else if (config.noPaging && api.all) {
        tableData.value = await api.all()
      } else {
        throw '请在分页时配置search函数, 或者在不分页时配置all函数'
      }
    } finally {
      loading.value = false
    }
  }
  const handleReset = async () => {
    paging.value.pageSize = undefined
    paging.value.pageNum = 1
    await handleSearch()
  }
  handleReset().then()
  const handleEdit = async (recordAble?: unknown) => {
    if (!recordAble) {
      record.value = {} as T
    } else if (['string', 'number'].includes(typeof recordAble)) {
      if (!api.getById) {
        throw Error('无法执行编辑操作: 需提供api: getById')
      }
      record.value = await api.getById(recordAble as string)
    } else {
      record.value = JSON.parse(JSON.stringify(recordAble)) as T
    }
    await config.beforeEdit?.(record)
    editing.value = true
  }

  const handleSubmit = async (formRef?: Ref<InstanceType<typeof LyForm>>) => {
    if (!api.edit) {
      throw Error('无法执行提交操作: 需提供api: edit')
    }
    updating.value = true
    try {
      await formRef?.value?.validate()
      await api.edit(record.value)
      await handleSearch()
      await ElMessage.success(record.value?.id ? '已修改' : '已添加')
      editing.value = false
    } finally {
      updating.value = false
    }
  }

  const handleRemove = async (id: string | string[]) => {
    if (!api.remove) {
      throw Error('无法执行删除操作: 需提供api: remove')
    }
    await api.remove?.(id)
    ElMessage.info('已删除')
    await handleSearch()
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
    updating,
    handleEdit,
    handleSubmit,
    handleRemove,
    name: config.name
  }
}

/**
 * 表单编辑, 仅支持非同一vue组件
 */
export function useCrudEdit<T extends DataRecord>(formRef: Ref<InstanceType<typeof LyForm>> | undefined): CrudEditContext<T> {
  const searchCtx = inject(searchAreaCtxKey, null)
  if (!searchCtx) {
    throw Error('需置于检索表单上下文之中')
  }
  watchEffect(() => {
    if (searchCtx.editing.value) {
      formRef?.value?.clearValidate()
    }
  })
  const handleOk = async () => {
    await searchCtx.handleSubmit(formRef)
  }
  console.log('searchCtx', searchCtx)
  return {
    editing: searchCtx.editing,
    updating: searchCtx.updating,
    record: searchCtx.record as Ref<T>,
    handleOk,
    name: searchCtx.name
  }
}

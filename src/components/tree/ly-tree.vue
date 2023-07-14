<template>
  <el-tree ref="treeRef"
           :data="data"
           :empty-text="emptyText!"
           :filter-node-method="filterNode"
           :node-key="nodeKey"
           default-expand-all
           v-on="bridgeEmits"
           @current-change="handleCurrentNodeChange">
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope"/>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'
import {computed, ref, watchEffect} from 'vue'
import {useBridgeEmits} from '@/use/bridge-emits'
import type {TreeNode} from 'element-plus'
import {ElTree} from 'element-plus'
import Pinyin from 'pinyin-match'
import type {TreeComponentProps} from 'element-plus/es/components/tree/src/tree.type'
import {useFieldModel} from '@/components/form/util/form-util'
import {BasicTree} from '@/types/utility-type'

const props = defineProps({
  /**
   * 展示数据
   */
  data: {
    type: Array,
    default: () => []
  },
  /**
   *  内容为空的时候展示的文本
   */
  emptyText: {
    type: String
  },
  /**
   * 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
   */
  nodeKey: {type: String, default: 'id'},
  /**
   * 关键词, 用于检索
   */
  keywords: String,
  /**
   * 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
   */
  checkStrictly: Boolean,
  /**
   *  当前选中的节点
   */
  currentNodeKey: [String, Number],
  /**
   * 节点是否可被选择
   */
  showCheckbox: Boolean,
  /**
   *  配置选项见官方文档
   */
  props: {
    type: Object as PropType<TreeComponentProps['props']>,
    default: () => ({
      children: 'children',
      label: 'label',
      disabled: 'disabled'
    })
  },
  /**
   * 加载子树数据的方法，仅当 lazy 属性为true 时生效
   */
  load: Function as PropType<TreeComponentProps['load']>,
  /**
   * 是否懒加载子节点，需与 load 方法结合使用
   */
  lazy: Boolean,
  /**
   * 过滤时, 支持的key, 默认使用props.label
   */
  filterKey: Array as PropType<string[]>
})
const emits = defineEmits([
  'check-change',
  'current-change',
  'node-click',
  'node-contextmenu',
  'node-collapse',
  'node-expand',
  'check',
  'update:currentNodeKey'
])
const treeRef = ref<InstanceType<typeof ElTree>>()
const bridgeEmits = useBridgeEmits(emits,
  ['check-change', 'node-click', 'node-contextmenu', 'node-collapse', 'node-expand', 'check'])

watchEffect(() => treeRef.value?.filter(props.keywords?.trim()))
const filterKey = computed(() => props.filterKey || [props.props?.label])
const filterNode = (keywords: string, data: BasicTree) => !keywords || Object.keys(data)
  .some(k => filterKey.value.includes(k) && data[k] && Pinyin.match(String(data[k]), keywords))

const currentNodeKey = useFieldModel(props as any, emits, 'currentNodeKey')

function handleCurrentNodeChange(data: BasicTree, node: TreeNode) {
  if (props.nodeKey) {
    currentNodeKey.value = data[props.nodeKey] as unknown as string
  }
  emits('current-change', data, node)
}
</script>

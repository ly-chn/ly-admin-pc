<script lang="ts" setup>
import {dictOptionsProps} from '@/components/form/util/form-props'
import {LyPropType} from '@/components/util/ly-prop-type'
import {computed, inject, onMounted, PropType, reactive, ref, watch} from 'vue'
import {lyTableColumnCollectCtxSymbol, lyTableColumnCustomerCtxSymbol} from '@/components/table/ly-table-ctx'
import {useColumnCollect} from '@/components/table/ly-table-util'

const props = defineProps({
  ...dictOptionsProps,
  // 显示的标题
  label: {
    type: String,
    required: true
  },
  // 字段名称 对应列内容的字段名， 也可以使用 property 属性
  prop: {
    type: String,
    required: true
  },
  // 对应列的宽度
  width: LyPropType.sideLength,
  // 对应列的最小宽度， 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
  minWidth: LyPropType.sideLength,
  // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>,
  // 为true表示可排序, 表现为分页处理
  sortable: Boolean,
  // 对齐方式
  align: String as PropType<'left' | 'center' | 'right'>
})

const columnCollectCtx = inject(lyTableColumnCollectCtxSymbol)
const children = useColumnCollect()
const el = ref<HTMLElement>()
const columnContext = reactive({
  label: props.label,
  children: children
})

const isInHeader = () => {
  let parent = el.value?.parentElement
  while (parent) {
    if (parent.classList.contains('hidden-columns')) {
      return true
    }
    if (parent.tagName === 'tr') {
      return false
    }
    parent = parent.parentElement
  }
  return false
}
onMounted(() => isInHeader() && columnCollectCtx?.addColumn(columnContext))

const columnCustomerContext = inject(lyTableColumnCustomerCtxSymbol)
const showAble = computed(() => columnCustomerContext?.showAbleColumns?.includes(props.label))
const key = ref(Math.random())
watch(showAble, () => key.value = Math.random(), {immediate: true})
</script>
<template>
  <!--如果使用一些特殊手段, 会发生一些异常, 原因不明, 只能用这个笨办法了-->
  <el-table-column v-if="showAble" :key="key"
                   ref="el"
                   :align="align"
                   :fixed="fixed"
                   :label="label"
                   :min-width="minWidth"
                   :prop="prop"
                   :sortable="sortable"
                   :width="width">
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="{ row: scope?.row, column: scope?.column, $index: scope?.$index }"></slot>
    </template>
  </el-table-column>
  <div v-else ref="el">
    <slot v-bind="{ row: undefined, column: undefined, $index: undefined }"></slot>
  </div>
</template>

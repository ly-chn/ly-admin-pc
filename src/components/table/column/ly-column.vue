<script lang="ts" setup>
import {dictOptionsProps} from '@/components/form/util/form-props'
import {LyPropType} from '@/components/util/ly-prop-type'
import type {PropType} from 'vue'
import {computed, inject, onMounted, reactive} from 'vue'
import {lyTableColumnCollectCtxSymbol, lyTableColumnCustomerCtxSymbol} from '@/components/table/ly-table-ctx'
import {getPropByPath, useColumnCollect} from '@/components/table/ly-table-util'
import {ElTableColumn} from 'element-plus'
import {usePropBoolify} from '@/components/util/ly-prop-boolify'
import LyDictRender from '@/components/special/ly-dict-render.vue'

const props = defineProps({
  ...dictOptionsProps,
  // 显示的标题
  label: {
    type: String,
    required: true
  },
  // 字段名称 对应列内容的字段名
  prop: String,
  // 对应列的宽度
  width: LyPropType.sideLength,
  // 对应列的最小宽度， 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
  minWidth: LyPropType.sideLength,
  // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  fixed: [Boolean, String] as PropType<true | 'left' | 'right'>,
  // 为true表示可排序, 表现为分页处理
  sortable: Boolean,
  /**
   * 居左快捷配置, 见align
   */
  left: Boolean,
  /**
   * 居中快捷配置, 见align
   */
  center: Boolean,
  /**
   * 居右快捷配置, 见align
   */
  right: Boolean,
  // 对齐方式
  align: String as PropType<'left' | 'center' | 'right'>,
  // 见ly-dict-render组件asText属性
  asText: Boolean
})

const columnCollectCtx = inject(lyTableColumnCollectCtxSymbol)
const children = useColumnCollect()
const columnContext = reactive({
  label: props.label,
  children: children
})

onMounted(() => columnCollectCtx?.addColumn(columnContext))

const finalAlign = usePropBoolify(props, 'align', 'left', 'center', 'right')
const columnCustomerContext = inject(lyTableColumnCustomerCtxSymbol)
// 全部隐藏=全部显示 todo: 面板展开时, 同步显示效果会更好
const showAble = computed(() => !columnCustomerContext?.showAbleColumns.length || columnCustomerContext?.showAbleColumns?.includes(props.label))

</script>
<template>
  <!--如果使用一些特殊手段, 会发生一些异常, 原因不明, 只能用这个笨办法了-->
  <el-table-column v-if="showAble"
                   :align="finalAlign"
                   :fixed="fixed"
                   :label="label"
                   :min-width="minWidth"
                   :prop="prop"
                   :sortable="sortable"
                   :width="width"
                   show-overflow-tooltip>
    <template v-if="$slots.default" #default="{ row, column, $index }">
      <slot :column="column" :row="row" v-bind="{$index: $index}"/>
    </template>
    <template v-else-if="props.dictCode||options" #default="{row}">
      <ly-dict-render :as-text="asText"
                      :dict-code="dictCode"
                      :model-value="getPropByPath(row, prop)"
                      :options="options"/>
    </template>
    <template v-if="$slots.header" #header>
      <slot name="header"/>
    </template>
  </el-table-column>
  <div v-else>
    <slot v-bind="{}"/>
  </div>
</template>

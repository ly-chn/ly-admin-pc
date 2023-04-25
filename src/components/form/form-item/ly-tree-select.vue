<script lang="ts" setup>
import {formFieldProps} from '@/components/form/util/form-props'
import {useFormField} from '@/components/form/util/form-util'
import type {PropType} from 'vue'
import type {TreeOptionProps} from 'element-plus/es/components/tree/src/tree.type'

const ctxProps = defineProps({
  // 展示数据
  data: Array,
  // 配置选项
  props: Object as PropType<TreeOptionProps>,
  // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
  nodeKey: String,
  ...formFieldProps
})
const emit = defineEmits(['update:modelValue'])
const {model, disabled} = useFormField(ctxProps, emit)
</script>
<template>
  <ly-form-item :label="label" :rules="rules" :value="model">
    <el-tree-select v-model="model" :data="data" :disabled="disabled" :node-key="nodeKey" :props="props"/>
  </ly-form-item>
</template>

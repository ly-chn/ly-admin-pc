<template>
  <el-dialog v-model="modelValue" :before-close="beforeClose"
             :fullscreen="fullscreen"
             :title="title"
             :top="top"
             :width="width"
             draggable>
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <ly-btn @click="modelValue = false">取消</ly-btn>
        <ly-btn type="primary" @click="emits('ok')">确认</ly-btn>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {useFieldModel} from '@/components/form/util/form-util'
import {PropType} from 'vue'

const props = defineProps({
  modelValue: Boolean,
  /**
   * Dialog 对话框 Dialog 的标题
   */
  title: String,
  /**
   * Dialog 的宽度
   */
  width: [String, Number],
  /**
   * 是否为全屏 Dialog
   */
  fullscreen: Boolean,
  /**
   * Dialog CSS 中的 margin-top 值
   */
  top: String,
  /**
   * 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候.
   */
  beforeClose: Function as PropType<(done: (() => void)) => void>
})
const emits = defineEmits(['update:modelValue', 'ok'])
const modelValue = useFieldModel(props, emits)
</script>

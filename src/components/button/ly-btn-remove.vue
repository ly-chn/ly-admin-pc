<template>
  <el-popover ref="popoverRef" @show="handleClick" :disabled="disabled || loading" placement="top" trigger="click" width="200">
    <template #default>
      {{ tipsContent }}
      <div class="remove-action">
        <ly-btn size="small" @click="handleCancel">取消</ly-btn>
        <ly-btn size="small" type="primary" @click="handleConfirm">确认</ly-btn>
      </div>
    </template>
    <template #reference>
      <ly-btn :disabled="disabled"
              :disabled-tips="disabledTips"
              :link="link"
              :loading="loading"
              icon="ep:delete"
              type="danger">
        <slot>删除</slot>
      </ly-btn>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'
import {ref} from 'vue'
import {lyBtnProps} from '@/components/button/util/btn-props'
import {ValueGetter} from '@/types/utility-type'
import {CastUtil} from '@/util/cast-util'
import {ElPopover} from 'element-plus'

const tipsContent = ref('')
const props = defineProps({
  ...lyBtnProps,
  /**
   * 如果配置此项, 则将其作为提示文案
   */
  tips: [String, Function] as PropType<ValueGetter<string>>,
  /**
   * 为true表示非重要数据, 无需二次确认
   */
  unimportant: Boolean
})
const emits = defineEmits(['click'])
const handleClick = () => tipsContent.value = CastUtil.unwrap(props.tips) || '确认要删除选中内容吗?'
const popoverRef = ref<InstanceType<typeof ElPopover>>()
const handleCancel = () => popoverRef.value?.hide()
const handleConfirm = () => {
  emits('click')
  popoverRef.value?.hide()
}
</script>
<style scoped>
.remove-action {
  text-align: right;
  padding-top: 6px;
}
</style>

<script lang="ts" setup>
import type {PropType} from 'vue'
import {ref} from 'vue'
import {onMounted} from 'vue'
import {watch} from 'vue'
import Iconify from '@purge-icons/generated'
import type {IconifyIconType} from '#/iconify'
import {ElIcon} from 'element-plus'

const props = defineProps({
  /**
   * 图标类型
   */
  type: String as PropType<IconifyIconType>,
  /**
   * 图标颜色
   */
  color: String,
  /**
   * 是否旋转
   */
  spin: Boolean,
  /**
   * 大小
   */
  size: [Number, String],
  /**
   * icon旋转角度(0-360)
   */
  rotate: Number
})
const spanRef = ref<InstanceType<typeof ElIcon>>()
const updateIcon = () => {
  const spanEl = spanRef.value?.$el
  if (spanEl) {
    spanEl.textContent = ''
    if (props.type) {
      const svg = Iconify.renderSVG(props.type, {})
      if (svg) {
        spanEl.appendChild(svg)
      }
    }
  }
}
onMounted(updateIcon)
watch(() => props.type, updateIcon)
</script>
<template>
  <el-icon ref="spanRef"
           :class="[$attrs.class, spin && 'icon-spinner']"
           :color="color"
           :size="size"/>
</template>
<style scoped>
.icon-spinner {
  animation: spin-animation 1s infinite;
  animation-timing-function: linear;
  display: inline-block;
}

@keyframes spin-animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

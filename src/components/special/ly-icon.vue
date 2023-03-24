<script lang="ts" setup>
import type {PropType} from 'vue'
import {ref} from 'vue'
import {unref} from 'vue'
import {onMounted} from 'vue'
import Iconify from '@purge-icons/generated'
import {watch} from 'vue'
import type {IconifyIconType} from '#/iconify'

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
  size: [String, Number]
})
const spanRef = ref<HTMLSpanElement>()
const updateIcon  = ()=>{
  const span = document.createElement('span')
  span.className = 'iconify'
  span.dataset.icon = props.type
  const spanEl = unref(spanRef)
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
watch(()=>props.type, updateIcon)
</script>
<template>
  <el-icon :color="color" :size="size">
  <span ref="spanRef"
      :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
  ></span>
  </el-icon>
</template>

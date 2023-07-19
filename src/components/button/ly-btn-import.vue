<template>
  <el-popover
    :disabled="!templateName || loading"
    :width="84"
    placement="top-start"
    trigger="hover">
    <el-link :href="`${appBase}/import-template/${templateName}`" download target="_blank">
      <ly-icon type="ep:download"/>
      下载导入模板
    </el-link>
    <template #reference>
      <ly-btn :disabled="disabled"
              :disabled-tips="disabledTips"
              :link="link"
              icon="ep:download"
              :loading="loading"
              type="primary"
              @click="handleClick">
        <slot>导入</slot>
      </ly-btn>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import {lyBtnProps} from '@/components/button/util/btn-props'
import {FileUtil} from '@/util/file-util'

defineProps({
  ...lyBtnProps,
  /**
   * 模板文件名, 位于src/assets/import-template目录中
   */
  templateName: String
})
const appBase = import.meta.env.BASE_URL
const emits = defineEmits<{
  click: [file: File]
}>()
const handleClick = async () => emits('click', await FileUtil.selectXlsx())
</script>
<style lang="scss" scoped>
.template-download {
  position: relative;

  .download-link {
    display: none;
    position: absolute;
  }

  &:hover .download-link {
    display: block;
  }
}
</style>

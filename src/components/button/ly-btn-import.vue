<template>
  <el-popover
    placement="top-start"
    :width="200"
    :disabled="!templateName"
    trigger="hover">
    <el-link href="/test.txt" target="_blank">下载导入模板</el-link>
    <el-link href="/import-template/test.txt" target="_blank">下载导入模板</el-link>
    <template #reference>
      <ly-btn :link="link"
              icon="ep:download"
              type="primary"
              :disabled-tips="disabledTips"
              :disabled="disabled"
              v-bind="bridgeEmits">
        <slot>导入</slot>
      </ly-btn>
    </template>
  </el-popover>

</template>

<script lang="ts" setup>
import {lyBtnProps} from '@/components/button/util/btn-props'
import {useBridgeEmits} from '@/use/bridge-emits'

defineProps({
  ...lyBtnProps,
  /**
   * 模板文件名, 位于src/assets/import-template目录中
   */
  templateName: String
})

const emits = defineEmits(['click'])
const bridgeEmits = useBridgeEmits(emits, ['click'])
</script>
<style lang="scss" scoped>
.template-download{
  position: relative;
  .download-link{
    display: none;
    position: absolute;
  }
  &:hover .download-link{
    display: block;
  }
}
</style>

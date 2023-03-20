<template>
  <component :is="asText?'span':'el-tag'" disable-transitions v-for="option in renderList" :title="option.tips" :key="option.value">
    {{option.label}}
  </component>
</template>

<script lang="ts" setup>
import {dictOptionsProps} from '@/components/form/util/form-props'
import {computed} from 'vue'
import {useDictOption} from '@/components/form/util/form-util'
import {CastUtil} from '@/util/cast-util'

const props = defineProps({
  ...dictOptionsProps,
  /**
   * 用于v-model
   */
  modelValue: String,
  // 为true时表示渲染为纯文本样式, 不显示el-tag
  asText: Boolean
})

const options = useDictOption(props)

const renderList = computed(() => {
  const value = CastUtil.array(props.modelValue)
  console.log(value, props.modelValue)
  return options.value.filter(it => value.includes(it.value))
})
</script>
<style lang="scss" scoped>
span {
  cursor: pointer;

  :not(:last-child):after {
    content: ' / ';
  }
}
</style>

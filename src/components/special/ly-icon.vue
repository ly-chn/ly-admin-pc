<script lang="ts">

import {Component, defineComponent} from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const ElIcon: { [key: string]: Component } = {}
Object.entries(ElementPlusIconsVue).forEach(entry => ElIcon[`El${entry[0]}`] = entry[1])
export default defineComponent({
  props: {
    // 图标类型, element-plus图标请自行添加el-, 其他类型图标暂未支持
    type: {
      type: String,
      required: true
    },
    // 填充色
    color: String,
    // 图标字体大小
    size: [String, Number]
  },
  components: ElIcon
})
</script>
<template>
  <el-icon :color="color" :size="size">
    <component :is="type" />
  </el-icon>
</template>

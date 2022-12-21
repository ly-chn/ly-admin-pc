<script lang="ts" setup>

import {Component} from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const ElIcon: { [key: string]: Component } = {}
Object.entries(ElementPlusIconsVue).forEach(entry => ElIcon[`El${entry[0]}`] = entry[1])

defineProps<{
  type: string,
  color?: string,
  size?: string | number
}>()
</script>
<template>
  <div></div>
  <!--<el-icon :color="color" :size="size">-->
  <!--  <component :is="type"/>-->
  <!--</el-icon>-->
</template>

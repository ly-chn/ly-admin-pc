<template>
  <template v-if="menuItem.meta.hidden"></template>
  <el-sub-menu :index="resolvePath(menuItem.path)" v-else-if="hasSubMenu">
    <template #title>{{ menuItem.meta.title }}</template>
    <simple-menu-item v-for="child in menuItem.children" :key="child.id" :menu-item="child" :base-path="resolvePath(child.path)">
      {{ child.meta.title }}
    </simple-menu-item>
  </el-sub-menu>
  <!--lyTodo: 如果只有一个可用子菜单, 则跳转到子菜单-->
  <el-menu-item v-else :index="basePath">
    {{ menuItem.meta.title }}
  </el-menu-item>
</template>

<script setup lang="ts">
import type {RouteRecordRaw} from 'vue-router'
import {computed} from 'vue'
import {IsInstance} from '@/util/is-instance'

const props = defineProps<{
  menuItem: RouteRecordRaw,
  basePath: string
}>()

const hasSubMenu = computed(() => (props.menuItem.children?.filter(it => !(it.meta?.hidden)).length ?? 0) > 1)

const resolvePath = (targetPath: string): string => {
  if (IsInstance.url(targetPath)) {
    return targetPath
  }
  if (IsInstance.url(props.basePath)) {
    return props.basePath
  }
  return `${props.basePath}/${targetPath}`
}
</script>

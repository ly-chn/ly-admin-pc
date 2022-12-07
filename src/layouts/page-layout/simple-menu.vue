<template>
  <el-scrollbar>
    <el-menu router>
      <simple-menu-item :menu-item="menuItem" v-for="menuItem of menuList" :key="menuItem.id" :base-path="menuItem.path"/>
    </el-menu>
  </el-scrollbar>

</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {computed} from 'vue'
import SimpleMenuItem from '@/layouts/page-layout/simple-menu-item.vue'

const {options: {routes}} = useRouter()

const menuList = computed(() => routes)

</script>

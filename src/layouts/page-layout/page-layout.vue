<template>
  <el-container class="min-h-screen">
    <el-aside :width="drawer?'auto':'200px'">
      <el-scrollbar>
        <el-menu :collapse="drawer" :default-active="activeMenu" router>
          <simple-menu-item v-for="menuItem of menuList" :key="menuItem.id" :base-path="menuItem.path"
                            :menu-item="menuItem"/>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <ly-toggle v-model="drawer">
          <ly-icon v-if="drawer" type="ep:fold"/>
          <ly-icon v-else type="ep:expand"/>
        </ly-toggle>
      </el-header>
      <el-main>
        <router-view #default="{ Component, route }">
          <transition appear mode="out-in" name="fade-slide">
            <!--     :include="getCaches"      -->
            <div :key="route.name">
              <keep-alive>
                <component :is="Component" :key="route.fullPath"/>
              </keep-alive>
            </div>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import SimpleMenuItem from '@/layouts/page-layout/simple-menu-item.vue'
import {useRouter} from 'vue-router'

const drawer = ref(false)

const {options: {routes}, currentRoute} = useRouter()

const menuList = computed(() => routes)
const activeMenu = computed(() => {
  const {meta, path} = currentRoute.value
  return meta.activeMenu || path
})
</script>

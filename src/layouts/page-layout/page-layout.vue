<template>
  <el-container class="min-h-screen">
    <el-aside :width="drawer?'auto':'200px'">
      <el-scrollbar>
        <el-menu :collapse="drawer" router :default-active="activeMenu">
          <simple-menu-item :menu-item="menuItem" v-for="menuItem of menuList" :key="menuItem.id"
                            :base-path="menuItem.path"/>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <ly-toggle v-model="drawer">
          <el-icon>
            <fold v-if="drawer"/>
            <expand v-else/>
          </el-icon>
        </ly-toggle>
      </el-header>
      <el-main>
        <router-view #default="{ Component, route }">
          <transition appear mode="out-in" name="fade-slide">
            <!--     :include="getCaches"      -->
            <keep-alive>
              <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {Expand, Fold} from '@element-plus/icons-vue'
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

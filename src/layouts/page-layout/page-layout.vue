<template>
  <el-container class="min-h-screen">
    <el-aside :width="drawer?'auto':'200px'">
      <simple-menu/>
    </el-aside>
    <el-container>
      <el-header>
        <ly-toggle v-model="drawer">
          <el-icon>
            <fold v-if="drawer" />
            <expand v-else />
          </el-icon>
        </ly-toggle>
      </el-header>
      <el-main>
        <router-view #default="{ Component, route }">
          <transition appear mode="out-in" name="fade-slide">
            <!--     :include="getCaches"      -->
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Expand, Fold} from '@element-plus/icons-vue'
import SimpleMenu from '@/layouts/page-layout/simple-menu.vue'

const drawer = ref(false)

</script>

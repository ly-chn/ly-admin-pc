<template>
  <el-container class="min-h-screen">
    <el-aside :width="drawer?'auto':'200px'">
      <el-menu :collapse="drawer"
               class="el-menu-vertical-demo"
               default-active="2">
        <el-sub-menu index="1">
          <template #title>
            <ly-icon type="el-location" />
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <ly-icon type="el-icon-menu" />
          <template #title>Navigator Two</template>
        </el-menu-item>
      </el-menu>
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
      <!--<el-footer class="text-right">
        &#45;&#45; by: xy
      </el-footer>-->
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Expand, Fold} from '@element-plus/icons-vue'
import LyToggle from '/@/components/special/ly-toggle.vue'
import LyIcon from '/@/components/special/ly-icon.vue'


const drawer = ref(false)

</script>

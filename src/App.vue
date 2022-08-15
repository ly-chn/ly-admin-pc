<script lang="ts" setup>
import LyToggle from '/@/components/special/ly-toggle.vue'
import {ref} from 'vue'

const value = ref(false)
</script>

<template>
  <!--<ly-icon/>-->
  <ly-toggle v-model="value" on-value="1" />
  <router-view />
</template>

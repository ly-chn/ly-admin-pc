<script lang="ts" setup>
import LyToggle from '/@/components/special/ly-toggle.vue'
import {ref} from 'vue'

const value = ref('1')
</script>

<template>
  <ly-toggle v-model="value" off-value="2" on-value="1"/>
</template>

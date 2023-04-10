<template>
  <div>
    <ly-icon-picker v-model="icon"/>
  </div>
</template>

<script lang="ts" setup>

import LyIconPicker from '@/components/special/ly-icon-picker.vue'
import {ref} from 'vue'

const icon = ref<string>()
</script>

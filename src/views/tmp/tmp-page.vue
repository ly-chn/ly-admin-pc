<template>
  <div>
    <ly-btn-import/>
    <ly-input-icon label="hi" v-model="icon"/>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import LyBtnImport from '@/components/button/ly-btn-import.vue'

const icon = ref<string>()
</script>

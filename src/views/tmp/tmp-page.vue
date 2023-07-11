<template>
  <div>
    <ly-input-icon label="hi" v-model="icon"/>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'

const icon = ref<string>()
</script>

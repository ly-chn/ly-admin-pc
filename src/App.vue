<script lang="ts" setup>
</script>

<template>
  <el-config-provider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </el-config-provider>
</template>

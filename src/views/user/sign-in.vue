<script setup lang="ts">

</script>

<template>
  <div class="sign-in-container">
    <div class="sign-in-container__login-form">
      <h1>登录</h1>
      <ly-form>
        <ly-input label="账号"/>
        <ly-input label="密码"/>
        <ly-form-item><ly-btn class="w-full">登录</ly-btn></ly-form-item>
      </ly-form>
      <el-divider>其他登录方式</el-divider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sign-in-container{
  @apply flex justify-center
}
.sign-in-container__login-form{
  @apply text-center w-md
}
</style>

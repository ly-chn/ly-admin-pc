<script setup lang="ts">

</script>

<template>
  <div class="sign-in-container">
    <div class="sign-in-container__login-form">
      <h1>登录</h1>
      <ly-form>
        <ly-input/>
        <ly-input/>
        <ly-btn>登录</ly-btn>
      </ly-form>
      <el-divider>其他登录方式</el-divider>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sign-in-container{
  @apply w-full
}
.login-container{

}
</style>

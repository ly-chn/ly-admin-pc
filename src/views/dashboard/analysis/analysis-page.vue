<template>
  <div>
    <ly-icon type="el-edit" />
    <ly-form one-third ref="formRef">
      <ly-input label="姓名" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="手机号" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="身份证号" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="我想告诉你我爱你" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="也不知道你能不能听得懂" v-model="form.name" placeholder="请输入名称" />
    </ly-form>
  </div>
</template>

<script lang="ts" setup>

import {reactive, ref} from 'vue'
import LyInput from '/@/components/form/form-item/ly-input.vue'

const form = reactive({
  name: null
})

const formRef = ref(null)
</script>

<template>
  <div>
    <ly-icon type="el-edit" />
    <ly-form one-third ref="formRef">
      <ly-input label="姓名" v-model="form.name" placeholder="请输入名称" :rules="$rules.must"/>
      <ly-input label="手机号" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="身份证" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="我想告" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="也不知" v-model="form.name" placeholder="请输入名称" />
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

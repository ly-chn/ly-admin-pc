<template>
  <div>
    <ly-icon type="el-edit" />
    <ly-form one-third ref="formRef">
      <ly-input label="姓名" v-model="form.name" :rules="$rules.must"/>
      <ly-input label="手机号" v-model="form.mobile" />
      <ly-input label="身份证" v-model="form.idCard" />
      <ly-select :options="options" :rules="$rules.must" label="性别"/>
    </ly-form>
  </div>
</template>

<script lang="ts" setup>

import {reactive, ref} from 'vue'
import {LyDictItem} from '@/components/form/util/form-props'

const form:Record<string, unknown> = reactive({})
const options:LyDictItem[] = [{
  label: '男',
  value: '1'
}, {
  label: '女',
  value: '2'
}]
const formRef = ref(null)
</script>

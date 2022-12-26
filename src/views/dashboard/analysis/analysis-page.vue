<template>
  <div>
    <ly-icon type="el-edit"/>
    <ly-form ref="formRef" one-third>
      <ly-input label="姓名" v-model="form.name" :rules="$rules.must"/>
      <ly-input label="手机号" v-model="form.mobile"/>
      <ly-input label="身份证" v-model="form.idCard"/>
      <ly-select label="性别" v-model="form.sex" :options="options" :rules="$rules.must"/>
    </ly-form>
    <ly-btn-search/>
  </div>
</template>

<script lang="ts" setup>

import {reactive, ref} from 'vue'
import {LyDictItem} from '@/components/form/util/form-props'
import LyBtnSearch from '@/components/button/ly-btn-search.vue'

const form: Record<string, unknown> = reactive({})
const options: LyDictItem[] = [{
  label: '男',
  value: '1',
  desc: '指男人，与“女”相对'
}, {
  label: '女',
  value: '2',
  desc: '指女人，与“男”相对'
}]
const formRef = ref(null)
</script>

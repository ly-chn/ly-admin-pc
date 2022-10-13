<template>
  <div>
    <ly-icon type="el-edit" />
    <ly-form >
      <ly-input label="姓名" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="手机号" v-model="form.name" placeholder="请输入名称" />
      <ly-input label="身份证号" v-model="form.name" placeholder="请输入名称" />
    </ly-form>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  data() {
    return {
      form: {
        name: '张三'
      }
    }
  },
}
</script>

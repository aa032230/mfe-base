<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="活动区域" prop="a">
        <el-input v-model="form.a"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="b">
        <el-input v-model="form.b"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        a: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        b: [{ required: true, message: '请选择活动区域', trigger: 'blur' }]
      }
    }
  }
}
</script>

<style></style>

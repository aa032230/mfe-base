<script>
/**
 * 平台弹窗
 */
import Vue from 'vue'
export default {
  name: 'anso-confirm',
  props: {},
  methods: {
    open() {
      const h = this.$createElement
      const temp = `<div style="color: red">
        <p >检测到未保存的内容，是否在离开页面前保存修改？</p>
        <p >检测到未保存的内容，是否在离开页面前保存修改2？</p>
        <p >检测到未保存的内容，是否在离开页面前保存修改3？</p>
      </div>`
      const _fargment = Vue.compile(temp)
      this.$confirm(h(_fargment), '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '保存',
        cancelButtonText: '放弃修改'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '保存修改'
          })
        })
        .catch((action) => {
          this.$message({
            type: 'info',
            message: action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面'
          })
        })
    }
  },
  render() {
    return (
      <el-button type="text" onClick={this.open}>
        点击打开 Message Box
      </el-button>
    )
  }
}
</script>

<style></style>

<script>
/**
 * @description: 权限按钮
 * @param {*}
 * @return {*}
 */
export default {
  name: 'AnsoButton',
  methods: {
    /**
     * @description: 校验按钮权限是否存在
     * @param {*} permission 权限
     * @return {*} boolean
     */
    isPermission(permission) {
      // const { btnTabInfo } = this.$route?.meta
      // const hasPermission = btnTabInfo.some(p => p.funcCode === permission)
      const s = true
      if (s) {
        return (
          <el-button attrs={this.$attrs} on={this.$listeners}>
            {this.$slots.default}
          </el-button>
        )
      }
    }
  },
  render() {
    return this.isPermission(this.$attrs.permission)
  }
}
</script>

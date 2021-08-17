<script>
/**
 * 表格头部
 */
export default {
  name: 'table-head',
  functional: true,
  methods: {},
  render(h, { props }) {
    const { title, buttons } = props
    return (
      <div class="table-head">
        <div class="table-head-title">{title}</div>
        <div class="table-head-btns">
          {buttons.map((btn) => {
            return (
              <el-button size={btn.size ? btn.size : 'small'} type={btn.type} onClick={btn.methods}>
                {btn.name}
              </el-button>
            )
          })}
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

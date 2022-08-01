<script>
export default {
  props: {
    defaultValue: {
        type: Number,
        default: 0
    }
  },
  data() {
    return {
      searchParams: {},
      val: this.defaultValue
    }
  },
  methods: {
    handleClick(plus) {
      const currentVal = this.val + plus
      if (currentVal >= 0 && currentVal < 2) {
        this.val = currentVal
        this.$emit('change', currentVal)
      }
    }
  },
  render() {
    const { handleClick } = this
    return (
      <div class="scm-top-tools container">
        <div class="left">
          {/* <MinusCircleOutlined onClick={() => handleClick(-1)} /> */}
          {/* <span style={{margin: '0 8px'}}>{val + 1}/2</span> */}
          {/* <PlusCircleOutlined onClick={() => handleClick(1)} /> */}
          <i class="el-icon-remove-outline" onClick={() => handleClick(-1)} />
          <i class="el-icon-circle-plus-outline" onClick={() => handleClick(1)} />
        </div>
        <div class="right">
          <span>
            <i class="el-icon-position" /> - 优先出运
          </span>
          <span>
            <i class="el-icon-caret-top" /> - 未质检（已过期）
          </span>
          <span>
            <i class="el-icon-umbrella" /> - 无预计交货日期或未匹配出运计划
          </span>
          <span class="badge" data-color="red">
            - 未结单据
          </span>
          <span class="badge" data-color="blue">
            - 海运已交货
          </span>
          <span class="badge" data-color="grey">
            - 空运已交货
          </span>
          <span class="badge" data-color="green">
            - 未通过审核的备货计划
          </span>
          <span class="badge" data-color="default">
            - 默认单据
          </span>
        </div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

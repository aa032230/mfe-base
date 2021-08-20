<script>
import vForm from '../v-form'
export default {
  name: 'table-form',
  components: {
    vForm
  },
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isOpen: false,
      socureElHeight: 52,
      elHeight: 0,
      form: {}
    }
  },
  mounted() {
    this._el = document.querySelector('.form-view')
    this.getElementRealTimeHeight()
    window.addEventListener('resize', this.getElementRealTimeHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getElementRealTimeHeight)
  },
  methods: {
    // 获取元素实时高度
    getElementRealTimeHeight() {
      const elHeight = this._el.offsetHeight || 0
      this.elHeight = elHeight
      if (elHeight <= 52) {
        this.socureElHeight = 52
      }
    },

    // 是否展开
    handleOpen() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.socureElHeight = this.elHeight
      } else {
        this.socureElHeight = 52
      }
    },

    // 查询
    handleQuery() {
      this.$emit('query', this.form)
    },

    // 重置
    handleReset() {
      this.form = this.$options.data().form
      this.$emit('reset')
    }
  },

  render() {
    const { formList, form, isOpen, socureElHeight, handleReset, handleQuery, handleOpen, elHeight } = this
    return (
      <div class="form-view-box" style={{ height: socureElHeight + 'px' }}>
        <section class="form-view" ref="formGroup">
          <v-form class={['v-form', { isopen: isOpen }]} formList={formList} v-model={form} />
        </section>
        <div class="from-view-button-group">
          <el-button size="small" onClick={handleReset}>
            重置
          </el-button>
          <el-button type="primary" size="small" onClick={handleQuery}>
            查询
          </el-button>
          {elHeight > 52 && (
            <span class="is-open" onClick={handleOpen}>
              {isOpen ? '收起' : '展开'}
              <em class={isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}></em>
            </span>
          )}
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

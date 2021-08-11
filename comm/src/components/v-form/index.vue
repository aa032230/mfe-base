<script>
export default {
  name: 'VForm',
  props: {
    formList: {
      type: Array,
      default: () => []
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
    this.init()
  },
  methods: {
    init() {
      window.addEventListener('resize', () => {
        const elHeight = this.$refs.formGroup.offsetHeight || 0
        this.elHeight = elHeight
        if (elHeight <= 52) {
          this.socureElHeight = 52
        }
      })
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
    },

    // formItem构建
    createFormItem(form) {
      return form.map((f) => {
        return (
          <div class="form-view-item" key={f.field}>
            <span>{f.name}:</span>
            {this.checkTypeToFormElement(f)}
          </div>
        )
      })
    },

    // 根据type渲染对应的from组件
    checkTypeToFormElement(r) {
      switch (r.type) {
        case 'select':
          return (
            <el-select size="small" style={{ width: r.width ? r.width + 'px' : '150px' }} v-model={this.form[r.field]}>
              {r.options.map((option) => (
                <el-option key={option.value} label={option.label} value={option.value} />
              ))}
            </el-select>
          )
        default:
          return (
            <el-input
              size="small"
              style={{ width: r.width ? r.width + 'px' : '150px' }}
              v-model={this.form[r.field]}
            ></el-input>
          )
      }
    }
  },

  render() {
    return (
      <div class="form-view-box" style={{ height: this.socureElHeight + 'px' }}>
        <section class="form-view" ref="formGroup">
          {this.createFormItem(this.formList)}
        </section>
        <div class="from-view-button-group">
          <el-button size="small" onClick={this.handleReset}>
            重置
          </el-button>
          <el-button type="primary" size="small" onClick={this.handleQuery}>
            查询
          </el-button>
          {this.elHeight > 52 && (
            <span class="is-open" onClick={this.handleOpen}>
              {this.isOpen ? '收起' : '展开'} 
              <em class={this.isOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}></em>
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

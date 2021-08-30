<script>
import ansoForm from '../anso-form'
export default {
  name: 'table-form',
  components: {
    ansoForm
  },
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    // 表单项
    formConfig: {
      type: Object,
      default: () => ({})
    },
    itemConfig: {
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
    // this.initForm()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getElementRealTimeHeight)
  },
  methods: {
    // 初始化表单字段
    initForm() {
      const { formList, form } = this
      Array.isArray(formList) &&
        formList.forEach((f) => {
          if (f.model || f.model === 0) {
            this.$set(form, f.field, f.model)
          } else {
            this.$set(form, f.field, '')
          }
        })
    },
    // 获取元素实时高度
    getElementRealTimeHeight() {
      // todo:resize是否重置属性
      // this.isOpen = false
      // this.socureElHeight = 52
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
      this.initForm()
      this.$emit('reset')
    }
  },

  render() {
    const {
      formList,
      form,
      isOpen,
      handleReset,
      handleQuery,
      handleOpen,
      elHeight,
      labelWidth,
      labelPosition,
      formConfig,
      itemConfig,
      itemRow
    } = this
    return (
      // <div class="form-view-box" style={{ height: socureElHeight + 'px' }}>
      <div class="form-view-box" style={{ height: isOpen ? 'auto' : '44px', transition: 'height 0.3s' }}>
        <section class="form-view" ref="formGroup">
          <anso-form
            class={['v-form', { isopen: isOpen }]}
            v-model={form}
            props={{ formConfig, itemConfig, labelPosition, formList, labelWidth }}
          />
        </section>
        <div class="from-view-button-group">
          <el-button size="mini" onClick={handleReset}>
            重置
          </el-button>
          <el-button size="mini" type="primary" onClick={handleQuery}>
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

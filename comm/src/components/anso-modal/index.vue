<script>
import { modalDrag } from '../../directives'
export default {
  name: 'AnsoModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // dialog 配置
    modalConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    // 按钮
    buttonConfig: {
      type: Array,
      default() {
        return [
          {
            name: 'cancel',
            text: '取消'
          },
          {
            name: 'confirm',
            text: '确定',
            type: 'primary'
          }
        ]
      }
    },
    // 是否显示底部插槽
    isFooter: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    modalDrag
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    /**
     * @description:  重新打开还原位置
     * @param {*} val
     * @return {*}
     */
    dialogVisible(val) {
      if (val) {
        console.log(this)
        this.$nextTick(() => {
          const el = this.$children[0].$refs.dialog
          el.style.left = 0
          el.style.top = 0
        })
      }
    }
  },
  methods: {
    /**
     * @description: 表单重置
     * @param {*}
     * @return {*}
     */
    resetForm() {
      this.dialogVisible = false
      const _instance = this.getInstance()
      if (!_instance) return
      const { ruleForm } = _instance
      ruleForm.resetFields()
    },

    /**
     * @description:  取消
     * @param {*}
     * @return {*}
     */
    handleCancle() {
      this.resetForm()
      this.$emit('cancel')
    },

    /**
     * @description:  关闭
     * @param {*}
     * @return {*}
     */
    handleClose() {
      this.$emit('close')
      this.resetForm()
    },

    /**
     * @description:  打开重置列表
     * @param {*}
     * @return {*}
     */
    handleOpen() {
      this.$emit('open')
    },

    /**
     * @description:  获取实例
     * @param {*}
     * @return {*}
     */
    getInstance() {
      if (!this.$slots.default[0].componentInstance?.$refs?.ruleForm) return
      const { $refs, value } = this.$slots.default[0]?.componentInstance
      return {
        ruleForm: $refs.ruleForm,
        form: value
      }
    },

    /**
     * @description:  确定
     * @param {*}
     * @return {*}
     */
    handleSubmit() {
      const _instance = this.getInstance()
      if (!_instance) {
        return this.$emit('submit')
      }
      const { ruleForm, form } = _instance
      ruleForm.validate(valid => {
        if (valid) {
          this.$emit('submit', form)
        } else {
          console.log('error submit!!')
        }
      })
    }
  },

  /**
   * @description: DOM渲染
   * @param {*}
   * @return {*}
   */
  render() {
    return this.dialogVisible ? (
      <el-dialog
        close-on-click-modal={false}
        v-modal-drag
        attrs={{
          width: this.size === 'lg' ? '900px' : this.size === 'small' ? '484px' : 'auto',
          ...this.modalConfig
        }}
        visible={this.dialogVisible}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        on={{ 'update:visible': val => (this.dialogVisible = val) }}
      >
        {this.$slots.title ? <template slot="title">{this.$slots.title}</template> : ''}
        <div class="v-modal-body">{this.$slots.default}</div>
        {this.buttonConfig.length ? (
          <span class="dialog-footer" slot="footer">
            {this.buttonConfig.map(item => {
              switch (item.name) {
                case 'cancel':
                  return (
                    <el-button
                      size={item.size ? item.size : 'small'}
                      type={item.type}
                      nativeOnClick={this.handleCancle}
                    >
                      {item.text}
                    </el-button>
                  )
                case 'confirm':
                  return (
                    <el-button type={item.type} size={item.size ? item.size : 'small'} onClick={this.handleSubmit}>
                      {item.text}
                    </el-button>
                  )
                case 'custom':
                  return item.custom()
                default:
                  return (
                    <el-button
                      size={item.size ? item.size : 'small'}
                      type={item.type}
                      nativeOnClick={e => {
                        e.preventDefault()
                        item.method()
                      }}
                    >
                      {item.text}
                    </el-button>
                  )
              }
            })}
          </span>
        ) : (
          ''
        )}
      </el-dialog>
    ) : (
      ''
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

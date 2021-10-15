<script>
import { modalDrag } from '../../directives'
import { DataBus } from '../../utils/'
export default {
  name: 'anso-modal',
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
    // 重新打开还原位置
    dialogVisible(val) {
      if (val) {
        const el = this.$el.querySelector('.el-dialog')
        el.style.left = 0
        el.style.top = 0
      }
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      this.dialogVisible = false
      const _instance = this.getInstance()
      if (!_instance) return
      const { ruleForm } = _instance
      ruleForm.resetFields()
    },
    // 取消
    handleCancle() {
      this.resetForm()
      this.$emit('cancel')
    },
    // 关闭
    handleClose() {
      this.resetForm()
      this.$emit('close')
    },
    // 打开重置列表
    handleOpen() {
      this.$emit('open')
    },
    // 获取实例
    getInstance() {
      if (!this.$slots.default[0].componentInstance?.$refs?.ruleForm) return
      const { $refs, value } = this.$slots.default[0].componentInstance
      return {
        ruleForm: $refs.ruleForm,
        form: value
      }
    },
    // 确定
    handleSubmit() {
      const _instance = this.getInstance()
      if (!_instance) return
      const { ruleForm, form } = _instance
      ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', form)
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
        }
      })
    }
  },
  render() {
    return (
      <el-dialog
        close-on-click-modal={false}
        v-modal-drag
        attrs={{ ...this.modalConfig }}
        visible={this.dialogVisible}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        on={{ 'update:visible': (val) => (this.dialogVisible = val) }}
      >
        <div class="v-modal-body">{this.$slots.default}</div>
        {this.buttonConfig.length ? (
          <span slot="footer" class="dialog-footer">
            {this.buttonConfig.map((item) => {
              switch (item.name) {
                case 'cancel':
                  return (
                    <el-button size={item.size ? item.size : 'mini'} type={item.type} nativeOnClick={this.handleCancle}>
                      {item.text}
                    </el-button>
                  )
                case 'confirm':
                  return (
                    <el-button type={item.type} size={item.size ? item.size : 'mini'} onClick={this.handleSubmit}>
                      {item.text}
                    </el-button>
                  )
                default:
                  return (
                    <el-button
                      size={item.size ? item.size : 'mini'}
                      type={item.type}
                      nativeOnClick={(e) => {
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
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

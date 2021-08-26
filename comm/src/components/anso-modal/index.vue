<script>
import { modalDrag } from '../../directives'
/**
 * demo:
 * <v-modal @cancel="handleCancel" @submit="handleSubmit" @open="handleOpen" @close="handleClose" :visible.sync="visible"  :modalConfig="modalConfig">
          <v-form :form-list="formList" ></v-form>
      </v-modal>
 * modalConfig:{ // 对应ele配置参数
        title: '标题',
        width: '30%',
      },
 */
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
            type: 'cancel',
            text: '取消'
          },
          {
            type: 'confirm',
            text: '确定'
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
    // 表单重置
    retsetFrom() {
      this.dialogVisible = false
      const { ruleForm } = this.$slots.default[0].componentInstance.$refs
      ruleForm.resetFields()
    },
    // 关闭modal
    handleClose() {
      this.retsetFrom()
      this.$emit('close')
    },
    // 取消
    handleCancle() {
      this.retsetFrom()
      this.$emit('cancle')
    },
    // 确定
    handleSubmit() {
      const { $refs, value } = this.$slots.default[0].componentInstance
      $refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', value)
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
        onOpen={this.$emit.bind(this, 'open')}
        onClose={this.handleClose}
        on={{ 'update:visible': (val) => (this.dialogVisible = val) }}
      >
        <div class="v-modal-body">{this.$slots.default}</div>
        <span slot="footer" class="dialog-footer">
          {this.buttonConfig.map((item) => {
            switch (item.type) {
              case 'cancel':
                return (
                  <el-button size="small" onClick={this.handleCancle}>
                    {item.text}
                  </el-button>
                )
              case 'confirm':
                return (
                  <el-button size="small" type="primary" onClick={this.handleSubmit}>
                    {item.text}
                  </el-button>
                )
              default:
                break
            }
          })}
        </span>
      </el-dialog>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

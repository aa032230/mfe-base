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
    // 取消
    handleCancle() {
      this.dialogVisible = false
      if (!this.$slots.default[0].componentInstance.$refs.ruleForm) return
      const { $refs } = this.$slots.default[0].componentInstance
      $refs.ruleForm.resetFields()
      this.$emit('cancle')
    },
    handleOpen() {
      DataBus.emit('reset', true)
      this.$emit('open')
    },
    // 确定
    handleSubmit() {
      if (!this.$slots.default[0].componentInstance.$refs.ruleForm) return
      const { $refs, value } = this.$slots.default[0].componentInstance
      $refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', value)
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
        onClose={this.$emit.bind(this, 'close')}
        on={{ 'update:visible': (val) => (this.dialogVisible = val) }}
      >
        <div class="v-modal-body">{this.$slots.default}</div>
        <span slot="footer" class="dialog-footer">
          {this.buttonConfig.map((item) => {
            switch (item.name) {
              case 'cancel':
                return (
                  <el-button size={item.size ? item.size : 'samll'} type={item.type} nativeOnClick={this.handleCancle}>
                    {item.text}
                  </el-button>
                )
              case 'confirm':
                return (
                  <el-button
                    size="small"
                    type={item.type}
                    size={item.size ? item.size : 'samll'}
                    onClick={this.handleSubmit}
                  >
                    {item.text}
                  </el-button>
                )
              default:
                return (
                  <el-button
                    size={item.size ? item.size : 'samll'}
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
      </el-dialog>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

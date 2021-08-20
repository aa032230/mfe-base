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
  name: 'v-modal',
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
    // 过滤参数
    filterProps(options) {
      let confirmText = '确 定'
      let cancelText = '取 消'
      const _props = {}
      Object.keys(options).forEach((k) => {
        switch (k) {
          case 'confirmText':
            confirmText = options[k]
            break
          case 'cancelText':
            cancelText = options[k]
            break
          default:
            Object.assign(_props, { [k]: options[k] })
            break
        }
      })
      return {
        confirmText,
        cancelText,
        props: _props
      }
    }
  },
  render() {
    const options = this.filterProps(this.modalConfig)
    return (
      <el-dialog
        close-on-click-modal={false}
        v-modal-drag
        attrs={{ ...options.props }}
        visible={this.dialogVisible}
        onOpen={this.$emit.bind(this, 'open')}
        onClose={this.$emit.bind(this, 'close')}
        on={{ 'update:visible': (val) => (this.dialogVisible = val) }}
      >
        <div class="v-modal-body">
          {this.$slots.default}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" onClick={this.$emit.bind(this, 'cancel')}>
            {options.cancelText}
          </el-button>
          <el-button size="small" type="primary" onClick={this.$emit.bind(this, 'submit')}>
            {options.confirmText}
          </el-button>
        </span>
      </el-dialog>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

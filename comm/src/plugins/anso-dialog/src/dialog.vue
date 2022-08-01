<script>
import { modalDrag } from '../../../directives'
const _dialog = {
  name: 'AnsoDialog',
  data() {
    return {
      visible: false
    }
  },
  directives: {
    modalDrag
  },
  methods: {
    handleClose() {
      const context = this.$refs.child?.$children[0]
      if (context && context.$el.classList.contains('el-form')) {
        context.resetFields()
      }
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
      this.visible = false
      this.$options.data()?.close && this.$options.data()?.close()
    },
    handleSubmit() {
      const instace = this.$refs.child
      const _el = this.$refs.child.$children[0]
      if (typeof _el.rules === 'object') {
        _el.validate((valid) => {
          if (valid) {
            this.$options.data().callback(instace)
            this.visible = false
          }
        })
      } else {
        this.visible = false
        this.$options.data().callback(instace)
      }
    }
  },
  render(h) {
    return h(
      'el-dialog',
      {
        props: {
          visible: this.visible,
          title: this.title,
          width: this.width || '30%',
          'before-close': this.handleClose,
          open: this.$emit('open'),
          'close-on-click-modal': false
        },
        directives: [{ name: 'modal-drag' }]
      },
      [
        h(
          'span',
          {
            slot: 'footer'
          },
          [
            this.cancleText &&
              h(
                'el-button',
                {
                  on: {
                    click: this.handleClose
                  },
                  props: {
                    size: 'small'
                  }
                },
                this.cancleText
              ),
            this.confirmText &&
              h(
                'el-button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: this.handleSubmit
                  }
                },
                this.confirmText
              )
          ]
        ),
        h(this.component, {
          ref: 'child',
          attrs: {
            ...this.componentConfig
          }
        })
      ]
    )
  }
}

export default _dialog
</script>
<style lang="scss" scoped>
@import './dialog.scss';
</style>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleSumbit() {
      this.visible = false
    },
    handleClose() {
      this.visible = false
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
          'before-close': this.handleClose
        }
      },
      [
        h(
          'span',
          {
            slot: 'footer'
          },
          [
            h(
              'el-button',
              {
                on: {
                  click: () => (this.visible = false)
                }
              },
              '取消'
            ),
            h(
              'el-button',
              {
                props: {
                  type: 'primary'
                },
                on: {
                  click: this.handleSumbit
                }
              },
              '确定'
            )
          ]
        ),
        h(this.component)
      ]
    )
  }
}
</script>

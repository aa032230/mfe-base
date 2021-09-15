<template>
  <Dialog :title="title" :visible.sync="visible" width="30%" :before-close="handleClose">
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <Button @click="visible = false">取 消</Button>
      <Button type="primary" @click="handleSumbit">确 定</Button>
    </span>
  </Dialog>
</template>
<script>
import { Dialog, Button } from 'element-ui'
export default {
  components: {
    Dialog,
    Button
  },
  data() {
    return {
      visible: false
    }
  },
  created () {
    this.$slots.default = 123
  },
  methods: {
    handleSumbit() {
      this.visible = false
    },
    handleClose() {
      this.visible = false
    }
  }
}
</script>

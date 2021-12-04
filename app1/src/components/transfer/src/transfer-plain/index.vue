<template>
  <div class="transfer-plain">
    <transferHead title="可选单位" total="6" placeholder="请输入"></transferHead>
  </div>
</template>

<script>
import transferHead from '../transfer-head'
export default {
  name: 'TransferPlain',
  components: {
    transferHead
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

<template>
  <div class="transfer-table">
    <transferHead title="可选单位" total="6" placeholder="搜索"></transferHead>
    <div class="transfer-table-main">
      <anso-table v-bind="config"></anso-table>
      <div class="transfer-table-clear">
        <el-button type="text" v-if="isChecked">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import transferHead from '../transfer-head'
import { useTableConfig } from './table.conf'
export default {
  name: 'TransferTable',
  components: {
    transferHead
  },
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      config: useTableConfig(this)
    }
  },
  created() {
    if (!this.isChecked) {
      this.config.columns = [{ type: 'selection' }, ...this.config.columns]
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>

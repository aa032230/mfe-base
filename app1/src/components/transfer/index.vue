<template>
  <div class="transfer">
    <div class="transfer-body">
      <div class="transfer-body-left">
        <transferTable ></transferTable>
      </div>
      <div class="transfer-body-right">
        <transferTable :isChecked="true"></transferTable>
      </div>
    </div>
    <div class="transfer-footer">
       <el-button size="small">取消</el-button>
       <el-button size="small" type="primary"> 确定</el-button>
    </div>
  </div>
</template>

<script>
import transferTable from './transfer-table'
export default {
  components: {
    transferTable
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

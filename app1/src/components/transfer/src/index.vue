<template>
  <div class="transfer">
    <div class="transfer-body">
      <div class="transfer-body-left">
        <transferTable :isChecked="true"></transferTable>
      </div>
      <div class="transfer-body-right">
        <!-- <transferPlain ></transferPlain> -->
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
.transfer {
  &-body {
    display: flex;
    &-left{
      width: 100%;
    }
    &-right {
      margin-left: 16px;
    }
  }
  &-footer{
    display: flex;
    padding-top: 32px;
    justify-content: flex-end;
  }
}
</style>

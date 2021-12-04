<template>
  <div class="transfer-head">
    <div class="transfer-head-left">{{ title }}（<span>{{ total }}</span>）</div>
    <div class="transfer-head-right">
      <el-input prefix-icon="el-icon-search" :placeholder="placeholder" size="mini"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransferHead',
  props: {
    title: String,
    total: [String, Number],
    placeholder: String
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
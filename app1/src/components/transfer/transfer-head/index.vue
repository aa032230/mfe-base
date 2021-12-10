<template>
  <div class="transfer-head">
    <div class="transfer-head-left">
      {{ title }}（<span>{{ total }}</span
      >）
    </div>
    <div class="transfer-head-right">
      <el-input
        prefix-icon="el-icon-search"
        :placeholder="placeholder"
        size="mini"
        v-model="filterText"
        @input="handleInput"
      ></el-input>
    </div>
  </div>
</template>

<script>
import { debounce } from 'comm/src/utils'
export default {
  name: 'TransferHead',
  props: {
    title: String,
    total: [String, Number],
    placeholder: String
  },
  data() {
    return {
      filterText: ''
    }
  },
  methods: {
    /**
     * @description: 派发当前输入内容
     * @param {*}
     * @return {*}
     */
    handleInput: debounce(function () {
      this.$emit('filter', this.filterText)
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

<template>
  <div class="transfer">
    <div class="transfer-body">
      <div class="transfer-body-left">
        <transferTable
          :columns="columns"
          :tableData="sourceData"
          ref="transferTable"
          :title="titles[0]"
          :placeholder="placeholder"
          :props="props"
          :count="leftTotal"
          :total="total"
          :selectionIds="selectionIds"
          :pageIndex.sync="query.pageIndex"
          :pageSize.sync="query.pageSize"
          @dispatch="$emit('dispatch', query)"
          :tableEvent="{ 'selection-change': handleSelectionChange }"
        ></transferTable>
      </div>
      <div class="transfer-body-right">
        <transferTable
          :isChecked="true"
          :columns="columns"
          :tableData="targetData"
          @delete="handleDelete"
          @clear="clear"
          :title="titles[1]"
          :placeholder="placeholder"
          :props="props"
          :count="rightTotal"
          :tableEvent="tableEvent"
        ></transferTable>
      </div>
    </div>
  </div>
</template>

<script>
import transferTable from './transfer-table'
import { DataBus } from 'comm/src/utils'
export default {
  components: {
    transferTable
  },
  props: {
    value: Array,
    tableData: Array,
    total: [String, Number],
    selectionIds: Array,
    columns: {
      type: Array,
      default: () => []
    },
    titles: {
      type: Array,
      default: () => ['标题1', '标题2']
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    pageSize: [String, Number],
    pageIndex: [String, Number],
    props: {
      type: Object,
      default() {
        return {
          label: 'name',
          key: 'key',
          disabled: 'disabled'
        }
      }
    }
  },
  data() {
    return {
      targetData: [],
      sourceData: this.value,
      query: {
        pageSize: 20,
        pageIndex: 1
      },
      tableEvent: {
        'cell-mouse-enter': r => this.$set(r, 'show', true),
        'cell-mouse-leave': r => this.$set(r, 'show', false)
      }
    }
  },
  mounted() {
    DataBus.on('setData', res => {
      this.$set(this, 'sourceData', res)
    })
  },
  computed: {
    leftTotal() {
      return this.total - this.targetData.length
    },
    rightTotal() {
      return this.targetData.length
    }
  },
  methods: {
    /**
     * @description: 全选
     * @param {*} val 被选中数据
     * @return {*}
     */
    handleSelectionChange(val) {
      // const data = cloneDeep(val)
      this.targetData = val
      this.$emit('getData', this.targetData)
    },
    /**
     * @description: 删除
     * @param {*} row 当前行信息
     * @return {*}
     */
    handleDelete(row) {
      const transferTable = this.$refs.transferTable
      if (transferTable) {
        const ansoTabel = transferTable.$refs.multipleTable.$refs.ansoTabel
        this.$set(row, 'show', false)
        ansoTabel.toggleRowSelection(row)
        this.$emit('getData', this.targetData)
      }
    },
    /**
     * @description: 清空数据
     * @param {*}
     * @return {*}
     */
    clear() {
      this.targetData = []
      this.$emit('getData', this.targetData)
      DataBus.emit('clearSelector')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

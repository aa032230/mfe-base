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
          :total="leftTotal"
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
          :total="rightTotal"
          :tableEvent="tableEvent"
        ></transferTable>
      </div>
    </div>
  </div>
</template>

<script>
import transferTable from './transfer-table'
import { DataBus } from 'comm/src/utils'
import { cloneDeep } from '../../../../comm/src/utils'
export default {
  components: {
    transferTable
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
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
      sourceData: this.tableData,
      tableEvent: {
        'cell-mouse-enter': this.cellMouseEnter,
        'cell-mouse-leave': r => (r.show = false)
      }
    }
  },
  computed: {
    leftTotal() {
      return this.tableData.length - this.targetData.length
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
      this.targetData = cloneDeep(val)
    },
    /**
     * @description: 鼠标移入
     * @param {*} r 当前行数据
     * @return {*}
     */
    cellMouseEnter(r) {
      this.$set(r, 'show', true)
      // r.show = true
    },
    /**
     * @description: 删除
     * @param {*} row 当前行信息
     * @return {*}
     */
    handleDelete(row) {
      // toggleRowSelection
      const transferTable = this.$refs.transferTable
      if (transferTable) {
        const ansoTabel = transferTable.$refs.multipleTable.$refs.ansoTabel
        const data = this.tableData.filter(item => item.id === row.id)[0]
        ansoTabel.toggleRowSelection(data)
      }
      this.targetData = this.targetData.filter(item => item.id !== row.id)
    },
    /**
     * @description: 清空数据
     * @param {*}
     * @return {*}
     */
    clear() {
      this.targetData = []
      DataBus.emit('clearSelector')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

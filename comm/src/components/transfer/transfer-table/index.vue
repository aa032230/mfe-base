<template>
  <div class="transfer-table">
    <transferHead
      :title="title"
      :total="count"
      :placeholder="placeholder"
      @filter="handleFilter"
    ></transferHead>
    <div class="transfer-table-main">
      <anso-table
        :pageIndex.sync="currentPage"
        :pageSize.sync="limit"
        :total="total"
        layout="sizes, prev, pager, next"
        ref="multipleTable"
        row-key="id"
        @pagination="$emit('dispatch')"
        :columns="
          isChecked
            ? [...columns, { custom: true, prop: 'csutom', width: '50px' }]
            : [
                {
                  type: 'selection',
                  width: '40px',
                  'reserve-selection': true,
                  selectable: row => !selectionIds.includes(row.id)
                },
                ...columns
              ]
        "
        :tableData="filteredData"
        :tableEvent="tableEvent"
      >
        <template #custom="scope" v-if="isChecked">
          <div
            @click="handleClick(scope)"
            class="transfer-table-main-del"
            v-show="scope.row.show"
          >
            <span class="el-icon-circle-close"></span>
          </div>
        </template>
      </anso-table>
      <div class="transfer-table-clear">
        <el-button type="text" v-if="isChecked" @click="$emit('clear')"
          >清空</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import transferHead from '../transfer-head'
import { DataBus, cloneDeep } from 'comm/src/utils'

export default {
  name: 'TransferTable',
  components: {
    transferHead
  },
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    },
    pageSize: [String, Number],
    pageIndex: [String, Number],
    columns: {
      type: Array,
      default: () => []
    },
    selectionIds: Array,
    count: [String, Number],
    tableEvent: Object,
    total: [String, Number],
    title: String,
    placeholder: String,
    props: Object // 需要过滤的字段的key，value
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    /**
     * @description: 获取符合匹配条件的数据
     * @param {*}
     * @return {*}
     */
    filteredData() {
      return this.tableData.filter(item => {
        const label = item[this.labelProp] || item[this.keyProp]
        return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1
      })
    },
    labelProp() {
      return this.props.label || 'name'
    },
    keyProp() {
      return this.props.key || 'key'
    },
    currentPage: {
      get() {
        return Number(this.pageIndex)
      },
      set(page) {
        this.$emit('update:pageIndex', page)
      }
    },
    limit: {
      get() {
        return Number(this.pageSize)
      },
      set(size) {
        this.$emit('update:pageSize', size)
      }
    }
  },
  mounted() {
    // 清空表格
    DataBus.on('clearSelector', () => {
      const multipleTable = this.$refs.multipleTable
      if (multipleTable) {
        const ansoTabel = multipleTable.$refs.ansoTabel
        ansoTabel.clearSelection()
      }
    })
  },
  methods: {
    /**
     * @description: 删除
     * @param {*} r 当前行数据
     * @return {*}
     */
    handleClick(r) {
      this.$emit('delete', r.row)
    },
    /**
     * @description:  过滤
     * @param {*} val  过滤匹配条件
     * @return {*}
     */
    handleFilter(val) {
      this.query = val
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>

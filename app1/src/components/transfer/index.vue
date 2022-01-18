<template>
  <div class="transfer">
    <div class="transfer-body">
      <div class="transfer-body-left">
        <el-input v-model="leftQuery"></el-input>
        <anso-table
          :columns="sourceColumns"
          :tableData="leftFilteredData"
          @selection-change="handleSelectionChange"
          :reserve-selection="true"
          row-key="id"
        ></anso-table>
      </div>
      <div class="transfer-body-right">
        <el-input v-model="rightQuery"></el-input>
        <anso-table :columns="targetcolumns" :tableData="rightFilteredData"></anso-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      targetData: [],
      sourceColumns: [
        {
          type: 'selection',
          width: '55',
          'reserve-selection': true
        },
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      targetcolumns: [
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      sourceData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      leftQuery: '',
      rightQuery: ''
    }
  },
  computed: {
    leftFilteredData() {
      return this.sourceData.filter((item) => {
        const label = item['name']
        return label.toLowerCase().indexOf(this.leftQuery.toLowerCase()) > -1
      })
    },
    rightFilteredData() {
      return this.targetData.filter((item) => {
        const label = item['name']
        return label.toLowerCase().indexOf(this.rightQuery.toLowerCase()) > -1
      })
    },
  },
  methods: {
    handleSelectionChange(val) {
      const data = JSON.parse(JSON.stringify(val))
      this.targetData = data
    },
    leftFilter(query) {
      this.leftQuery = query
    },
    rightFilter(query) {
      this.rightQuery = query
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

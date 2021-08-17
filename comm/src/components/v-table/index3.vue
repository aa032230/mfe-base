<script>
export default {
  name: 'v-table',
  data() {
    return {
      cellHeight: 0,
      targetColumns: [], // 目标表头
      sourceColumns: [
        {
          prop: 'date',
          label: '日期',
          checked: true
        },
        {
          prop: 'name',
          label: '姓名',
          checked: true
        },
        {
          prop: 'address',
          label: '地址',
          checked: true
        },
        {
          prop: 'title',
          label: '地址1'
        },
        {
          prop: 'head',
          label: '地址2',
          checked: true
        },
        {
          prop: 'hh3',
          label: '地址3',
          checked: true
        }
      ], // 目标表头
      buttons: [
        {
          name: '新增',
          type: 'primary',
          methods() {
            console.log(111111111)
          }
        },
        {
          name: '批量导入',
          methods() {
            console.log('批量导入')
          }
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    // 修改表格行高
    getSpace(h) {
      this.cellHeight = h
      console.log(this.cellHeight)
    },
    // 获取选中的表头
    getCheckedColumns(columns) {
      this.targetColumns = columns
    }
  },
  render() {
    return (
      <div class="v-table">
        <el-table class="v-table-main-table" data={this.tableData} style="width: 100%;" border id="print">
          {this.sourceColumns.map((col) => {
            return <el-table-column prop={col.prop} label={col.label} key={col.prop}></el-table-column>
          })}
        </el-table>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

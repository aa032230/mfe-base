<script>
import { tableForm, tableHead, tableTools } from '..'
export default {
  name: 'v-table',
  props: {
    formList: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    tableForm,
    tableHead,
    tableTools
  },
  data() {
    return {
      cellHeight: 0,
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
      this.sourceColumns = columns
    }
  },
  render() {
    return (
      <div class="v-table">
        <div class="v-table-header">
          <table-form form-list={this.formList}></table-form>
        </div>
        <div class="v-table-main">
          <table-head title={this.title} buttons={this.buttons}></table-head>
          <table-tools
            printId="print"
            getSpace={this.getSpace}
            getCheckedColumns={this.getCheckedColumns}
            sourceColumns={this.sourceColumns}
          ></table-tools>
          <el-table
            class="v-table-main-table"
            data={this.tableData}
            style="width: 100%;"
            border
            id="print"
            row-style={{ height: this.cellHeight + 'px' }}
          >
            {this.sourceColumns.map((col) => {
              if (col.checked) {
                return <el-table-column prop={col.prop} label={col.label} key={col.prop}></el-table-column>
              }
            })}
          </el-table>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

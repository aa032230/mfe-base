<script>
import { tableForm, tableHead, tableTools, vTable } from '..'
export default {
  name: 'table-page',
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
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    hasSelection: {
      type: Boolean,
      default: true
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    tableEvent: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    tableForm,
    tableHead,
    tableTools,
    vTable
  },
  data() {
    return {
      cellHeight: 0,
      
      targetColumns: [], // 目标表头
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
      isPrint: false
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
    },
    // execl下载
    handleExport() {
      console.log(11111)
    },
    // 查询
    handleQuery(form) {
      console.log(form)
    }
  },
  render() {
    return (
      <div class="table-page">
        <div class="table-page-header">
          {/* 表头表单 */}
          <table-form form-list={this.formList} onQuery={this.handleQuery}></table-form>
        </div>
        <div class="table-page-main">
          {/* 表头 */}
          <table-head title={this.title} buttons={this.buttons}></table-head>
          {/* 表格工具栏 */}
          <table-tools
            onGetSpace={this.getSpace}
            onGetCheckedColumns={this.getCheckedColumns}
            columns={this.columns}
            onExport={this.handleExport}
          ></table-tools>
          {/* 表格 */}
          <div id="print" class="print-wrap">
            <v-table
              tableData={this.tableData}
              columns={this.targetColumns}
              tableEvent={this.tableEvent}
              tableConfig={this.tableConfig}
              row-style={{ height: this.cellHeight + 'px' }}
            ></v-table>
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

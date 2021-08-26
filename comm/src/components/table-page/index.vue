<script>
import { tableForm, tableHead, tableTools, ansoTable } from '..'
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
    operates: {
      type: Array,
      default: () => []
    },
    operatesWidth: {
      type: String,
      default: ''
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    tableEvent: {
      type: Object,
      default: () => ({})
    },
    toolsConfig: {
      type: Array,
      default: () => []
    },
    // 页码
    pageIndex: {
      type: Number,
      default: 1
    },
    // 页容量
    pageSize: {
      type: Number,
      default: 20
    },
    // 页码配置
    pageSizes: {
      type: Array,
      default() {
        return [1, 20, 40, 50, 100]
      }
    },
    // 分页布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    //总条数
    total: {
      type: Number,
      default: 0
    },
    headerConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    tableForm,
    tableHead,
    tableTools,
    ansoTable
  },
  data() {
    return {
      cellHeight: 0,
      targetColumns: [], // 目标表头
      isPrint: false
    }
  },
  computed: {
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
    // console.log(this.$scopedSlots.custom())
  },
  methods: {
    // 修改表格行高
    setSpace(h) {
      this.cellHeight = h
    },
    // 获取选中的表头
    setCheckedColumns(columns) {
      this.targetColumns = columns
    },
    // execl下载
    handleExport() {
      console.log(11111)
    },
    // 查询
    handleQuery(form) {
      this.$emit('query', form)
    },
    // 重置表单
    handleReset() {
      this.$emit('reset')
    },
    //页码/页容量选择
    dispatchEvent() {
      this.$emit('pagination')
    }
  },
  render() {
    return (
      <div class="table-page">
        <div class="table-page-main">
          {/* 表格按钮 */}
          <table-head headerConfig={this.headerConfig}></table-head>
          {/* 表格表单 */}
          <div class="table-page-main-form">
            <table-form form-list={this.formList} onQuery={this.handleQuery} onReset={this.handleReset}></table-form>
          </div>
          {/* 表格工具栏 */}
          <table-tools
            toolsConfig={this.toolsConfig}
            onSetSpace={this.setSpace}
            onSetCheckedColumns={this.setCheckedColumns}
            columns={this.columns}
            onExport={this.handleExport}
            printId="print"
          ></table-tools>
          {/* 表格 */}
          <div class="table-page-main-table">
            <anso-table
              id="print"
              tableData={this.tableData}
              columns={this.targetColumns}
              tableEvent={this.tableEvent}
              tableConfig={this.tableConfig}
              operates={this.operates}
              row-style={{ height: this.cellHeight + 'px' }}
              pageIndex={this.currentPage}
              pageSize={this.limit}
              on={{
                'update:pageIndex': (page) => (this.currentPage = page),
                'update:pageSize': (size) => (this.limit = size)
              }}
              layout={this.layout}
              page-sizes={this.pageSizes}
              total={this.total}
              on-pagination={this.dispatchEvent}
              scopedSlots={{
                custom: (scope) => this.$scopedSlots.custom(scope)
              }}
            ></anso-table>
          </div>
          {this.$slots.default}
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

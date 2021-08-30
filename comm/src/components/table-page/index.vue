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
    },
    // 表单项
    formConfig: {
      type: Object,
      default: () => ({})
    },
    itemConfig: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
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
      console.log(112)
      this.$emit('pagination')
    }
  },
  render() {
    const {
      headerConfig,
      formList,
      formConfig,
      itemConfig,
      labelWidth,
      labelPosition,
      rules,
      model,
      handleQuery,
      handleReset,
      toolsConfig,
      setSpace,
      setCheckedColumns,
      columns,
      handleExport,
      tableData,
      targetColumns,
      tableEvent,
      tableConfig,
      operates,
      cellHeight,
      currentPage,
      limit,
      layout,
      pageSizes,
      total,
      dispatchEvent
    } = this
    return (
      <div class="table-page">
        <div class="table-page-main">
          {/* 表格按钮 */}
          <table-head headerConfig={headerConfig}></table-head>
          {/* 表格表单 */}
          <div class="table-page-main-form">
            <table-form
              props={{ formList, formConfig, itemConfig, labelWidth, labelPosition, rules, model }}
              onQuery={handleQuery}
              onReset={handleReset}
            ></table-form>
          </div>
          {/* 表格工具栏 */}
          <table-tools
            props={{ toolsConfig, columns }}
            onSetSpace={setSpace}
            onSetCheckedColumns={setCheckedColumns}
            onExport={handleExport}
            printId="print"
          ></table-tools>
          {/* 表格 */}
          <div class="table-page-main-table">
            <anso-table
              id="print"
              props={{
                tableData,
                columns: targetColumns,
                tableEvent,
                tableConfig,
                operates,
                'row-style': { height: cellHeight + 'px' },
                layout,
                pageSizes,
                total
              }}
              pageIndex={currentPage}
              pageSize={limit}
              on={{
                'update:pageIndex': (page) => (this.currentPage = page),
                'update:pageSize': (size) => (this.limit = size),
                pagination: dispatchEvent
              }}
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

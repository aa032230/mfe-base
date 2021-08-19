<script>
export default {
  name: 'v-table',
  props: {
    // 表头
    columns: {
      type: Array,
      default: () => []
    },
    // 表数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 复选框
    hasSelection: {
      type: Boolean,
      default: true
    },
    // 序号
    hasIndex: {
      type: Boolean,
      default: true
    },
    // 表配置
    tableConfig: {
      type: Object,
      default: () => ({})
    },
    // 表事件
    tableEvent: {
      type: Object,
      default: () => ({})
    },
    // 行样式
    rowStyle: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    // 遍历筛选column
    createColumsFragment(columns) {
      return columns.map((col) => {
        return (
          <el-table-column
            props={{ ...col }}
            key={col.prop}
            {...{
              scopedSlots: {
                default: (scope) => {
                  return col.render ? col.render(scope.row[col.prop]) : scope.row[col.prop]
                }
              }
            }}
          >
            {col.children && col.children.length ? this.createColumsFragment(col.children) : ''}
          </el-table-column>
        )
      })
    }
  },
  render() {
    const { columns, rowStyle, tableData, hasSelection, createColumsFragment, hasIndex } = this
    return (
      <el-table
        class="v-table"
        data={tableData}
        style="width: 100%;"
        row-style={rowStyle}
        {...{ attrs: this.tableConfig }}
        {...{ on: this.tableEvent }}
      >
        {hasSelection ? <el-table-column type="selection" width="50" align="left"></el-table-column> : null}
        {hasIndex ? <el-table-column type="index" width="45"></el-table-column> : ''}
        {/* column渲染 */}
        {createColumsFragment(columns)}
        {/* 插槽 */}
        {this.$slots.default}
      </el-table>
    )
  }
}
</script>

<style></style>

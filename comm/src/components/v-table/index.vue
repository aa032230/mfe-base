<script>
export default {
  name: 'v-table',
  props: {
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
    },
    rowStyle: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    // 遍历筛选column
    createColumsFragment(columns) {
      return columns.map((col) => {
        console.log(col)
        return (
          <el-table-column
            props={{...col }}
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
        {createColumsFragment(columns)}
        <slot></slot>
      </el-table>
    )
  }
}
</script>

<style></style>

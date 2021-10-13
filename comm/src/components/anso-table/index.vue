<script>
import { willStampToDate } from '../../utils'
export default {
  name: 'anso-table',
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
    // 操作
    operates: {
      type: Object,
      default: () => {}
    },
    operatesWidth: {
      type: String,
      default: ''
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
        return [20, 40, 50, 100]
      }
    },
    // 分页布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    //总条数
    total: {
      type: [Number, String],
      default: 0
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
        console.log(size)
        this.$emit('update:pageSize', size)
      }
    }
  },
  methods: {
    // 遍历筛选column
    createColumsFragment(columns) {
      return columns.map((col) => {
        return col.type ? (
          <el-table-column attrs={{ ...col }} key={col.type} show-overflow-tooltip></el-table-column>
        ) : (
          <el-table-column
            attrs={{ ...col }}
            key={col.prop}
            show-overflow-tooltip
            scopedSlots={{
              default: (scope) => {
                if (col.render) {
                  return col.render(scope.row, col.prop)
                } else if (col.slot) {
                  return this.$scopedSlots.default({
                    row: scope.row,
                    prop: col.prop
                  })
                } else {
                  return col.format ? willStampToDate(scope.row[col.prop], col.format) : scope.row[col.prop] || '--'
                }
              }
            }}
          >
            {col.children && col.children.length ? this.createColumsFragment(col.children) : ''}
          </el-table-column>
        )
      })
    },

    // 表格操作列筛选，超过三个用‘更多’下拉代替
    createOperates(scope, operates) {
      const [generalOperates, specialOperates] = [[], []]
      operates.forEach((option, index) => (index > 2 ? specialOperates.push(option) : generalOperates.push(option)))
      if (specialOperates.length) {
        generalOperates.push({
          label: '更多',
          children: specialOperates
        })
      }
      return generalOperates.map((btn) => {
        return this.switchOperares(scope, btn)
      })
    },

    // 根据按钮文本为按钮添加对应的parentElement
    switchOperares(scope, operate) {
      const _flag = operate.show ? operate.show(scope.row) : true
      switch (operate.label) {
        // case '删除':
        //   return (
        //     <el-popconfirm
        //       title="这是一段内容确定删除吗？"
        //       onConfirm={() => {
        //         operate.method(scope.$index, scope.row)
        //       }}
        //     >
        //       <el-button
        //         slot="reference"
        //         key={operate.label}
        //         type={operate.type}
        //         size={operate.size ? operate.size : 'small'}
        //       >
        //         {operate.label}
        //       </el-button>
        //     </el-popconfirm>
        //   )
        case '更多':
          return (
            <el-dropdown class="table-wrap-dropdown">
              <span class="el-dropdown-link">
                {operate.label}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                {operate.children.map((c) => {
                  return <el-dropdown-item>{this.switchOperares(scope, c)}</el-dropdown-item>
                })}
              </el-dropdown-menu>
            </el-dropdown>
          )
        default:
          return _flag ? (
            <el-button
              class="table-wrap-btn"
              key={operate.label}
              type={operate.type}
              size={operate.size ? operate.size : 'small'}
              disabled={operate.disabled ? operate.disabled(scope.row) : false}
              loading={operate.isLoading ? operate.isLoading(scope.row) : false}
              nativeOnClick={(e) => {
                e.preventDefault()
                operate.method(scope.$index, scope.row, e)
              }}
            >
              {operate.label}
            </el-button>
          ) : (
            ''
          )
      }
    },

    // 改变页码/页容量
    _dispatchEvent() {
      // console.log(this.currentPage)
      this.$emit('pagination')
    },
    // 获取操作列属性
    getOperatesAttrs(operates) {
      const _props = {}
      Object.keys(operates).forEach((k) => {
        if (k !== 'data') {
          Object.assign(_props, { [k]: operates[k] })
        }
      })
      return _props
    }
  },
  render(h) {
    const {
      columns,
      rowStyle,
      tableData,
      createColumsFragment,
      operates,
      createOperates,
      total,
      currentPage,
      limit,
      layout,
      pageSizes,
      _dispatchEvent
    } = this

    return (
      <div class="table-wrap">
        <el-table
          v-loading={this.tableData.length ? false : true}
          class="v-table"
          data={tableData}
          style="width: 100%;"
          row-style={rowStyle}
          attrs={{
            height: 'calc(100% - 56px)',
            'header-cell-style': { background: '#f9f9f9' },
            'tooltip-effect': 'light',
            ...this.$attrs
          }}
          on={{ ...this.$listeners }}
        >
          {/* column渲染 */}
          {createColumsFragment(columns)}
          {/* <slot></slot> */}
          {this.$slots.default}
          {/* 操作列 */}
          {operates?.data.length ? (
            <el-table-column
              props={{ label: '操作', ...this.getOperatesAttrs(operates) }}
              scopedSlots={{
                default: (scope) => createOperates(scope, operates.data)
              }}
            />
          ) : (
            ''
          )}
          {/* 空展示 */}
          <el-empty slot="empty" description="暂无数据~~~"></el-empty>
        </el-table>
        {/* 分页 */}
        {total ? (
          <div class="v-pager">
            <el-pagination
              class="page"
              current-page={currentPage}
              page-size={limit}
              on={{
                'update:currentPage': (page) => {
                  this.currentPage = page
                },
                'update:pageSize': (size) => {
                  this.limit = size
                }
              }}
              layout={layout}
              page-sizes={pageSizes}
              total={Number(total)}
              on-size-change={(val) => _dispatchEvent(this, val)}
              on-current-change={(val) => _dispatchEvent(this, val)}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

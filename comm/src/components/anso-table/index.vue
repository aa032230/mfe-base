<script>
/**
 * demo:
 * // 表头
 * columns: [
      {
        prop: 'date',
        label: '日期',
        checked: true,
        // todo: 下面为可选参数
        render:(val) => val === 1 ? 'a' : 'b'
        sortable: true,
          'sort-method': () => console.log('sort') or this.myAction
          children: [
            {
              prop: 'name',
              label: '姓名',
              checked: true,
              children: [
                {
                  prop: 'name',
                  label: '姓名',
                  checked: true
                },
                {
                  prop: 'address',
                  label: '地址',
                  checked: true
                }
              ]
            },
            {
              prop: 'address',
              label: '地址',
              checked: true
          }
          ]
      }
        ]

   // 表格操作列
    operates: [
        {
          label: '解析报文',
          type: 'text',
          method: (index, row) => { ... } or this.myAction
        }
      ],

 *
 * todo： key需要按照element-ui约定的参数或事件写法
 * // 表格配置
 * tableConfig: {
        border: true,
        'row-key': 'id',
        'header-row-style': {}
        ...
      },
 * // 表格事件
 * tableEvent: {
 *  'selection-change': (arg) => ... , or this.myAction
 *  'row-click': (row, column, event)=> ... or this.myAction
 * }
 */
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
      type: Array,
      default: () => []
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
      type: Number,
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
        this.$emit('update:pageSize', size)
      }
    }
  },
  methods: {
    // 遍历筛选column
    createColumsFragment(columns, createApp) {
      return columns.map((col) => {
        return (
          <el-table-column
            attrs={{ ...col }}
            key={col.prop}
            scopedSlots={{
              default: (scope) => {
                if (col.render) {
                  return col.render(scope.row, col.prop)
                } else if (col.custom) {
                  return this.$scopedSlots.custom({ row: scope.row, prop: col.prop })
                } else {
                  return scope.row[col.prop]
                }
              }
            }}
          >
            {col.children && col.children.length ? this.createColumsFragment(col.children, createApp) : ''}
          </el-table-column>
        )
      })
    },

    // 表格操作列
    createOperates({ scope, operates }) {
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

    // 操作列筛选，超过三个用‘更多’下拉代替
    switchOperares(scope, operate) {
      switch (operate.label) {
        case '删除':
          return (
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              onConfirm={() => {
                operate.method(scope.$index, scope.row)
              }}
            >
              <el-button
                slot="reference"
                key={operate.label}
                type={operate.type}
                size={operate.size ? operate.size : 'small'}
              >
                {operate.label}
              </el-button>
            </el-popconfirm>
          )
        case '更多':
          return (
            <el-dropdown class="table-wrap-dropdown">
              <span class="el-dropdown-link">
                {operate.label}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                {operate.children.map((c) => {
                  return <el-dropdown-item>{this.switchOperares(scope, c)}</el-dropdown-item>
                })}
              </el-dropdown-menu>
            </el-dropdown>
          )
        default:
          return (
            <el-button
              class="table-wrap-btn"
              key={operate.label}
              type={operate.type}
              size={operate.size ? operate.size : 'small'}
              nativeOnClick={(e) => {
                e.preventDefault()
                operate.method(scope.$index, scope.row)
              }}
            >
              {operate.label}
            </el-button>
          )
      }
    },

    // 改变页码/页容量
    _dispatchEvent() {
      // console.log(this.currentPage)
      this.$emit('pagination')
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
          class="v-table"
          data={tableData}
          style="width: 100%;"
          row-style={rowStyle}
          attrs={{
            height: 'calc(100% - 62px)',
            'header-cell-style': { background: '#f9f9f9' },
            'tooltip-effect': 'light',
            ...this.tableConfig
          }}
          on={this.tableEvent}
        >
          {/* column渲染 */}
          {createColumsFragment(columns, h)}
          {/* <slot></slot> */}
          {this.$slots.default}
          {/* 操作列 */}
          <el-table-column
            label="操作"
            align="center"
            scopedSlots={{
              default: (scope) => createOperates({ scope, operates })
            }}
          />
          <el-empty slot="empty" description="暂无数据~~~"></el-empty>
        </el-table>
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
              total={total}
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

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

import { ansoPager } from '../'
export default {
  name: 'anso-table',
  components: { ansoPager },
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
        console.log(size)
        this.$emit('update:pageSize', size)
      }
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
            scopedSlots={{
              default: (scope) => {
                return col.render ? col.render(scope.row[col.prop]) : scope.row[col.prop]
              }
            }}
          >
            {col.children && col.children.length ? this.createColumsFragment(col.children) : ''}
          </el-table-column>
        )
      })
    },
    // 表格操作列
    createOperates({ scope, operates }) {
      return operates.map((btn) => {
        switch (btn.label) {
          case '删除':
            return (
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                onConfirm={() => {
                  btn.method(scope.$index, scope.row)
                }}
              >
                <el-button slot="reference" key={btn.label} type={btn.type} size={btn.size ? btn.size : 'small'}>
                  {btn.label}
                </el-button>
              </el-popconfirm>
            )
          default:
            return (
              <el-button
                class="table-wrap-btn"
                key={btn.label}
                type={btn.type}
                size={btn.size ? btn.size : 'small'}
                nativeOnClick={(e) => {
                  e.preventDefault()
                  btn.method(scope.$index, scope.row)
                }}
              >
                {btn.label}
              </el-button>
            )
        }
      })
    },
    // 改变页码/页容量
    _dispatchEvent() {
      // console.log(this.currentPage)
      this.$emit('pagination')
    }
  },
  render() {
    const {
      columns,
      rowStyle,
      tableData,
      hasSelection,
      createColumsFragment,
      hasIndex,
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
          attrs={{ ...this.tableConfig, height: 'calc(100% - 62px)','header-cell-style':{background: '#f9f9f9'}}}
          
          on={this.tableEvent}
        >
          {hasSelection ? <el-table-column type="selection" width="50" align="left"></el-table-column> : ''}
          {hasIndex ? <el-table-column type="index" width="45"></el-table-column> : ''}
          {/* column渲染 */}
          {createColumsFragment(columns)}
          {/* <slot></slot> */}
          {this.$slots.default}
          {/* 操作列 */}
          <el-table-column
            label="操作"
            scopedSlots={{
              default: (scope) => createOperates({ scope, operates })
            }}
          />
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

<script>
/**
 * 分页
 */
export default {
  name: 'v-pager',
  props: {
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 40, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
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
    // 改变页码/页容量
    _dispatchEvent(val) {
      this.$emit('query', val)
    }
  },
  render() {
    return (
      <div class="v-pager">
        <el-pagination
          class="page"
          current-page={this.currentPage}
          page-size={this.limit}
          on={{
            'update:current-page': (page) => (this.currentPage = page),
            'update:page-size': (size) => (this.limit = size)
          }}
          layout={this.layout}
          page-sizes={this.pageSizes}
          total={this.total}
          on-size-change={(val) => this._dispatchEvent.bind(this, val)}
          on-current-change={(val) => {
            this._dispatchEvent.bind(this, val)
          }}
        />
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

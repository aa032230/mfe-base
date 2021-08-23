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
    _dispatchEvent(pagePrams) {
      this.$emit('query', pagePrams)
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
            'update:currentPage': (page) => (this.currentPage = page),
            'update:pageSize': (size) => (this.limit = size)
          }}
          layout={this.layout}
          page-sizes={this.pageSizes}
          total={this.total}
          on-size-change={(val) => this._dispatchEvent(val)}
          on-current-change={(val) => {
            this._dispatchEvent(val)
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

<script>
export default {
  name: 'ansoSidebar',
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    },
    router: {
      type: Boolean,
      default: true
    },
    textColor: {
      type: String,
      default: '#FFF'
    },
    bgColor: {
      type: String,
      default: '#001529'
    },
    activeTextColor: {
      type: String,
      default: '#FFF'
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    uniqueOpened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    collapse: false,
    currentActive: ''
  }),
  created() {
    this.getCurrentActive()
  },
  watch: {
    $route: 'getCurrentActive'
  },
  methods: {
    createMenu(arr) {
      return arr.map((item, index) => {
        if (item?.meta?.isHidden) return
        // 如果存在子集
        if (Array.isArray(item.children)) {
          return (
            <el-submenu index={item.index} key={item.index}>
              <template slot="title">
                {item.icon && <i class={item.icon} />}
                <span title={item.name}>{item.name}</span>
              </template>
              {this.createMenu(item.children)}
            </el-submenu>
          )
        } else {
          return (
            <el-menu-item index={item.index} key={item.index}>
              {item.icon && <i class={item.icon} />}
              <span slot="title" title={item.name}>
                {item.name}
              </span>
            </el-menu-item>
          )
        }
      })
    },
    // 获取当前active
    getCurrentActive() {
      this.currentActive = this.$route.fullPath
    },
    open(index, indexPath) {
      this.$emit('open', index, indexPath)
    },
    select(index, indexPath) {
      this.currentActive = index
    },
    close(index, indexPath) {
      this.$emit('close', index, indexPath)
    },
    handleCollapse() {
      this.collapse = !this.collapse
    }
  },
  render() {
    // console.log(this.defaultActive)
    const MenuAttribute = {
      props: {
        router: this.router,
        backgroundColor: this.bgColor,
        textColor: this.textColor,
        activeTextColor: this.activeTextColor,
        mode: this.mode,
        collapse: this.collapse,
        defaultActive: this.currentActive,
        uniqueOpened: this.uniqueOpened
      },
      on: {
        open: this.open,
        select: this.select
      }
    }
    const { collapse, menuList, handleCollapse, createMenu } = this
    return (
      <el-scrollbar width="initial" class={['app-scrollbar', { 'el-menu-collapse': collapse }]}>
        <el-menu class="menu-collapse" style="width: 100%" {...MenuAttribute}>
          {createMenu(menuList)}
        </el-menu>
        <span class={[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold', 'is-collapse']} onClick={handleCollapse}></span>
      </el-scrollbar>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>
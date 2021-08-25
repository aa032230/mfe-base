<script>
import { DataBus } from '../../utils/dataBus'
export default {
  name: 'AnsoSidebar',
  data: () => ({
    collapse: false
  }),
  props: {
    menuList: {
      type: Array,
      dafault: []
    },
    router: {
      type: Boolean,
      default: true
    },
    textColor: {
      type: String,
      default: '#8C8C8C'
    },
    bgColor: {
      type: String,
      default: '#ffffff' // #F3F5F8
    },
    activeTextColor: {
      type: String,
      default: '#3171F2'
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    defaultActive: String,
    uniqueOpened: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    createMenu(arr) {
      return arr.map((item, index) => {
        // 如果存在子集
        if (Array.isArray(item.children)) {
          return (
            <el-submenu index={item.index} key={item.index}>
              <template slot="title">
                {item.icon && <i class={item.icon} />}
                <span title={item.menuName}>{item.menuName}</span>
              </template>
              {this.createMenu(item.children)}
            </el-submenu>
          )
        } else {
          return (
            <el-menu-item index={item.index} key={item.index}>
              {item.icon && <i class={item.icon} />}
              <span slot="title" title={item.menuName}>
                {item.menuName}
              </span>
            </el-menu-item>
          )
        }
      })
    },

    open(index, indexPath) {
      this.$emit('open', index, indexPath)
    },
    select(index, indexPath) {
      this.$emit('select', index, indexPath)
    },
    close(index, indexPath) {
      this.$emit('close', index, indexPath)
    },
    handleCollapse(collapse) {
      this.collapse = collapse
      // actions.setGlobalState({ isCollapse: this.collapse })
      // DataBus.emit('collapse', this.collapse)
    }
  },
  render() {
    const MenuAttribute = {
      props: {
        router: this.router,
        backgroundColor: this.bgColor,
        textColor: this.textColor,
        activeTextColor: this.activeTextColor,
        mode: this.mode,
        collapse: this.collapse,
        defaultActive: this.defaultActive,
        uniqueOpened: this.uniqueOpened
      },
      on: {
        open: this.open,
        select: this.select
      }
    }
    return (
      <el-scrollbar class={['app-scrollbar', { 'el-menu-collapse': this.collapse }]}>
        <el-menu class="menu-collapse" style="width: 100%" {...MenuAttribute}>
          {' '}
          {this.createMenu(this.menuList)}
        </el-menu>
      </el-scrollbar>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>
<style lang="scss">
.el-menu--popup {
  .el-menu-item {
    height: 36px;
    line-height: 36px;
  }
}
</style>

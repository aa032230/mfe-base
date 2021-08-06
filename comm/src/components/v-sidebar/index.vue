<script>
export default {
  name: "VSidebar",
  data: () => ({
    collapse: false,
  }),
  props: {
    menuList: {
      type: Array,
      dafault: () => [],
    },
    router: {
      type: Boolean,
      default: true,
    },
    textColor: {
      type: String,
      default: "#FFF",
    },
    bgColor: {
      type: String,
      default: "#001529",
    },
    activeTextColor: {
      type: String,
      default: "#FFF",
    },
    mode: {
      type: String,
      default: "vertical",
    },
    defaultActive: {
      type: String,
      default: ''
    },
    uniqueOpened: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    createMenu(arr) {
      return arr.map((item, index) => {
        const { isHidden } = item.meta;
        if (isHidden) return;
        // 如果存在子集
        if (Array.isArray(item.children)) {
          return (
            <el-submenu index={item.index} key={index}>
              <template slot="title">
                {item.icon && <i class={item.icon} />}
                <span title={item.name}>{item.name}</span>
              </template>
              {this.createMenu(item.children)}
            </el-submenu>
          );
        } else {
          return (
            <el-menu-item index={item.index} key={index}>
              {item.icon && <i class={item.icon} />}
              <span slot="title" title={item.name}>
                {item.name}
              </span>
            </el-menu-item>
          );
        }
      });
    },

    open(index, indexPath) {
      this.$emit("open", index, indexPath);
    },
    select(index, indexPath) {
      this.$emit("select", index, indexPath);
    },
    close(index, indexPath) {
      this.$emit("close", index, indexPath);
    },
    handleCollapse() {
      this.collapse = !this.collapse;
    },
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
        uniqueOpened: this.uniqueOpened,
      },
      on: {
        open: this.open,
        select: this.select,
      },
    };
    return (
      <el-scrollbar
        width="initial"
        class={["app-scrollbar", { "el-menu-collapse": this.collapse }]}
      >
        <el-menu class="menu-collapse" style="width: 100%" {...MenuAttribute}>
          {" "}
          {this.createMenu(this.menuList)}
        </el-menu>
        <span
          class={[
            this.collapse ? "el-icon-s-unfold" : "el-icon-s-fold",
            "is-collapse",
          ]}
          onClick={this.handleCollapse}
        ></span>
      </el-scrollbar>
    );
  },
};
</script>
<style lang="scss" scoped>
@import "./index";
</style>

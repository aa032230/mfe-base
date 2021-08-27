<script>
export default {
  name: 'v-tree',
  props: {
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    treeConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    treeWidth: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(node) {},
    append(data) {
      const newChild = { id: 3, label: 'testtest', children: [] }
      if (!data.children) {
        console.log(data)
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent({ node, data, store }) {
      return (
        <div
          class="custom-tree-node"
          onMouseenter={() => this.$set(data, 'isShow', true)}
          onMouseleave={() => this.$set(data, 'isShow', false)}
        >
          <span class='custom-tree-node-label'>{node.label}</span>
          <span style={{ display: data.isShow ? 'block' : 'none' }}>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>
              Append
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
              Delete
            </el-button>
          </span>
        </div>
      )
    }
  },
  render() {
    const { treeData, treeConfig, treeWidth } = this

    return (
      <div style={{ width: treeWidth }} class="v-tree">
        <el-tree
          data={treeData}
          props={treeConfig}
          on-node-click={this.handleClick}
          render-content={(h, options) => this.renderContent(options)}
        ></el-tree>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

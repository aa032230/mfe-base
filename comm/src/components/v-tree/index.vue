<script>
export default {
  name: 'v-tree',
  props: {
    treeEvent: {
      type: Object,
      default() {
        return {}
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
    handleNodeClick(node) {
      this.$emit('nodeClick', node)
    },

    // 编辑
    handleEdit(data) {
      this.$emit('update', data)
    },

    // 删除
    remove(node, data) {
      this.$emit('remove', data)
    },
    // 树结构重绘
    renderContent({ node, data, store }) {
      return (
        <div
          class="custom-tree-node"
          onMouseenter={() => this.$set(data, 'isShow', true)}
          onMouseleave={() => this.$set(data, 'isShow', false)}
        >
          <span class="custom-tree-node-label">{node.label}</span>
          <span class="custom-tree-node-tool" style={{ display: data.isShow ? 'block' : 'none' }}>
            <em
              class="el-icon-edit-outline"
              on-click={(e) => {
                e.stopPropagation()
                this.handleEdit(data)
              }}
            ></em>
            <em
              class="el-icon-delete"
              on-click={(e) => {
                e.stopPropagation()
                this.remove(node, data)
              }}
            ></em>
          </span>
        </div>
      )
    },
    // 校验是否同级拖拽
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.level === dropNode.level) {
        if (draggingNode.parent.id === dropNode.parent.id) {
          return type === 'prev' || type === 'next'
        }
      } else {
        return false
      }
    },
    handleCheck(...args) {
      this.$emit('nodeChange', ...args )
    },
    handleNodeDrop(...args) {
      this.$emit('nodeDropEnd', ...args)
    }
  },
  render() {
    const { treeConfig, treeWidth, allowDrop, treeEvent } = this
    return (
      <div style={{ width: treeWidth }} class="v-tree">
        <el-tree
          ref="tree"
          attrs={{
            'allow-drop': (...args) => allowDrop(...args),
            'render-content': (h, options) => this.renderContent(options),
            ...treeConfig
          }}
          on={{
            'node-drop': (...args) => this.handleNodeDrop(...args),
            'node-click': (...args) => this.handleNodeClick(...args),
            'check-change': (...args) => this.handleCheck(...args),
            ...treeEvent
          }}
        ></el-tree>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

<script>
/**
 *<anso-Tree
        :tree-width="treeWidth"
        :tree-config="treeConfig"
        :tree-event="treeEvent"
        @select="handleSelect"
        @remove="handleRemove"
        @add="handleAdd"
      ></anso-Tree>
 */
import { cloneDeep } from 'lodash'
import { flatten, treeFormat } from '../../utils'
export default {
  name: 'anso-tree',
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
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {
      treeValue: '',
      treeNodes: [],
      isExpand: true,
      treeData: []
    }
  },
  watch: {
    treeConfig: {
      handler(val) {
        const { data, enable, pIdKey } = this.treeConfig
        if (!enable) {
          this.treeData = data
        } else {
          this.treeData = treeFormat({ list: data, pid: pIdKey })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 返回建议数据
    querySearch(queryString, cb) {
      const { treeConfig } = this
      if(!Array.isArray(treeConfig.data )) return
      const tree = cloneDeep(treeConfig.data)
      const restaurants = treeConfig?.enable ? tree : flatten(tree)
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 过滤
    createFilter(queryString) {
      return (restaurant) => {
        console.log(restaurant[this.treeConfig?.defaultProps.label])
        return restaurant[this.treeConfig?.defaultProps.label].toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    // 搜索
    handleSelect(node) {
      this.$refs.tree.setCurrentKey(node.id)
      this.treeNodes.push(node.id)
      this.$emit('select', node)
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
      const { treeConfig } = this
      const _name = treeConfig.defaultProps.label
      return (
        <div
          class="custom-tree-node"
          onMouseenter={() => this.$set(data, 'isShow', true)}
          onMouseleave={() => this.$set(data, 'isShow', false)}
        >
          <span class="custom-tree-node-label">{data[_name]}</span>
          <span class="custom-tree-node-tool" style={{ display: data.isShow ? 'block' : 'none' }}>
            {treeConfig.draggable ? <em class="el-icon-rank"></em> : ''}
            {treeConfig.edit ? (
              <em
                class="el-icon-edit-outline"
                on-click={(e) => {
                  e.stopPropagation()
                  this.handleEdit(data)
                }}
              ></em>
            ) : (
              ''
            )}
            {treeConfig.delete ? (
              <em
                class="el-icon-delete"
                on-click={(e) => {
                  e.stopPropagation()
                  this.remove(node, data)
                }}
              ></em>
            ) : (
              ''
            )}
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
    }
  },
  render() {
    const { treeConfig, treeWidth, allowDrop, treeEvent, placeholder, treeNodes } = this
    const _name = treeConfig?.defaultProps.label
    return (
      <div class="anso-tree-wrap" style={{ width: this.isExpand ? treeWidth : '15px' }}>
        <div class="anso-tree" style={{ display: this.isExpand ? 'block' : 'none' }}>
          {/* 搜索 */}
          <div class="anso-tree-search">
            <el-autocomplete
              class="inline-input"
              onSelect={this.handleSelect.bind(this)}
              fetch-suggestions={this.querySearch.bind(this)}
              prefixIcon="el-icon-search"
              size="small"
              placeholder={placeholder}
              v-model={this.treeValue}
              clearable
              value-key={_name}
            ></el-autocomplete>
            {treeConfig.add ? (
              <el-button
                class="plus"
                size="mini"
                icon="el-icon-plus"
                nativeOnClick={this.$emit.bind(this, 'add')}
              ></el-button>
            ) : (
              ''
            )}
          </div>
          {/* 标题 */}
          <div class="anso-tree-title">{treeConfig.title}</div>
          {/* 自定义 */}
          {this.$slots.default}
          {/* tree */}
          <el-tree
            ref="tree"
            highlight-current
            class="tree"
            attrs={{
              'node-key': 'id',
              ...treeConfig,
              data: this.treeData,
              'allow-drop': (...args) => allowDrop(...args),
              'render-content': (h, options) => this.renderContent(options),
              'default-expanded-keys': treeNodes
            }}
            on={treeEvent}
          ></el-tree>
        </div>
        {/* 伸展/收缩按钮 */}
        <div
          class="icon-wrap"
          onClick={() => {
            this.isExpand = !this.isExpand
          }}
        >
          <div class="icon-wrap-main">
            <span class={['icon', this.isExpand ? 'el-icon-caret-left' : 'el-icon-caret-right']}></span>
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

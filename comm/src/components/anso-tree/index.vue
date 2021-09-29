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
    },
    currentNodeKey: {
      type: [String, Number],
      default: ''
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
          this.treeData = treeFormat(data, 'id', pIdKey)
        }
      },
      deep: true,
      immediate: true
    },
    /**
     * @description: currentNodeKey动态变化时，需要使用setCurrentKey设置选择效果
     * @param {*} n
     * @return {*}
     */

    currentNodeKey(n) {
      setTimeout(() => {
        this.setCurrentActive(n)
      }, 1000)
    }
  },
  mounted() {
    this.$emit('onCreated', this.$refs.tree)
  },
  methods: {
    /**
     * @description:  返回建议数据
     * @param {*} queryString
     * @param {*} cb
     * @return {*}
     */
    querySearch(queryString, cb) {
      const { treeConfig } = this
      if (!treeConfig.data) return
      const tree = cloneDeep(treeConfig.data)
      const restaurants = treeConfig?.enable ? tree : flatten(tree)
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    /**
     * @description: 过滤
     * @param {*} queryString
     * @return {*}
     */
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant[this.treeConfig?.props.label].toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    /**
     * @description:  搜索
     * @param {*} node
     * @return {*}
     */
    handleSelect(data) {
      this.setCurrentActive(data.id)
      let node = this.$refs.tree.getNode(data.id)
      this.$emit('select', data, node)
    },
    /**
     * @description: 根据id设置节点高亮
     * @param {*} id
     * @return {*}
     */

    setCurrentActive(id) {
      this.$refs.tree.setCurrentKey(id)
      this.treeNodes.push(id)
    },

    /**
     * @description:  编辑
     * @param {*} data
     * @return {*}
     */
    handleEdit(data) {
      this.$emit('update', data)
    },

    /**
     * @description: 删除
     * @param {*} node
     * @param {*} data
     * @return {*}
     */
    remove(node, data) {
      this.$emit('remove', data)
    },
    /**
     * @description: 节点点击事件
     * @param {*} node  当前节点数据
     * @return {*}
     */
    handlerNodeClick(node, ...args) {
      if (node.disabled) {
        this.$nextTick(() => {
          const ele = document.querySelector('.is-focusable')
          if (!ele.classList.contains('is-current')) {
            ele.classList.add('is-current')
          }
        })
        return
      }
      this.treeEvent['node-click'](node, ...args)
    },
    /**
     * @description: 树结构重绘
     * @param {*} node
     * @param {*} data
     * @param {*} store
     * @return {*}
     */
    renderContent({ node, data, store }) {
      const { treeConfig } = this
      const _name = treeConfig.props.label
      return (
        <div class={['custom-tree-node', !data.disabled ? '' : 'is_disabled']}>
          <span class="custom-tree-node-label">{data[_name]}</span>
          {!data.disabled ? (
            <span class="custom-tree-node-tool">
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
          ) : (
            ''
          )}
        </div>
      )
    },

    /**
     * @description:  校验是否同级拖拽
     * @param {*} draggingNode
     * @param {*} dropNode
     * @param {*} type
     * @return {*}
     */
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

  /**
   * @description:
   * @param {*}
   * @return {*}
   */

  render() {
    const { treeConfig, treeWidth, allowDrop, treeEvent, placeholder, treeNodes, currentNodeKey } = this
    const _name = treeConfig?.props.label
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
            check-on-click-node
            current-node-key={currentNodeKey}
            attrs={{
              'node-key': 'id',
              ...treeConfig,
              title: '',

              data: this.treeData,
              'allow-drop': (...args) => allowDrop(...args),
              'render-content': (h, options) => this.renderContent(options),
              'default-expanded-keys': treeNodes
            }}
            on={{
              ...treeEvent,
              'node-click': this.handlerNodeClick
            }}
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

<template>
  <!--
    /**
     * 树形下拉选择组件，下拉框展示树形结构，提供选择某节点功能，方便其他模块调用
     * 调用示例：
     * <ansoTreeSelect v-model="treeValue"  // 默认值
     *              size="small"  // 输入框的尺寸: medium/small/mini
     *              :data="data" // 树结构的数据
     *              :props="props" // 树结构的props
     *              :accordion="" // boolean 树是否自动收起
     *              multiple   // 多选
     *              checkStrictly   // 多选时， 是否严格遵循父子不互相关联
     *              collapseTags   // 多选时是否将选中值按文字的形式展示
     *              clearable   // 可清空选择
     *            </ansoTreeSelect>
     */
-->
  <el-select
    v-model="selectData"
    ref="treeSelect"
    :size="size"
    :style="{ width: selectWidth }"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :clearable="clearable"
    :placeholder="selectPlaceHolder"
    @clear="clearHandle"
    class="tree-select"
  >
    <el-input :size="size" class="selectInput" :placeholder="placeholder" v-model="filterText" clearable></el-input>
    <!-- <el-option hidden :value="options[0].value" :label="options[0].label" class="options"></el-option> -->
    <template v-for="item in options">
      <el-option hidden :key="item.value" :label="item.label" :value="item.value"></el-option>
    </template>
    <el-tree
      id="tree-option"
      ref="selectTree"
      :accordion="accordion"
      :data="data"
      :props="props"
      :show-checkbox="multiple"
      :check-on-click-node="multiple"
      :check-strictly="checkStrictly"
      :node-key="props.value"
      :default-expanded-keys="defaultExpandedKey"
      default-expand-all
      :highlight-current="true"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    ></el-tree>
  </el-select>
</template>

<script>
export default {
  name: 'anso-tree-select',
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'title', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    /* 选项列表数据(树形结构的对象数组) */
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    /* 初始值 */
    value: {},
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    /* 多选时是否将选中值按文字的形式展示 */
    collapseTags: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    selectWidth: {
      type: String,
      default: ''
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    /* 是否可多选 */
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default() {
        return false
      }
    },
    size: {
      type: String,
      default() {
        return 'small'
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return '检索关键字'
      }
    },
    selectPlaceHolder: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      filterText: '',
      selectData: undefined, // 选中的节点
      defaultValue: this.value, // 初始值
      defaultExpandedKey: [],
      options: [
        {
          value: '',
          label: ''
        }
      ]
    }
  },
  mounted() {
    this.initCheckedData()
  },
  methods: {
    initCheckedData() {
      if (this.multiple) {
        // 多选
        if (!Array.isArray(this.defaultValue)) {
          throw new Error('anso-tree-select当前为多选， v-model请传数组')
        }
        if (this.defaultValue.length > 0) {
          this.checkSelectedNodes(this.defaultValue)
        } else {
          this.clearSelectedNodes()
        }
      } else {
        // 单选
        if (Array.isArray(this.defaultValue)) {
          throw new Error('anso-tree-select当前为单选， v-model不能传数组')
        }
        if (this.defaultValue !== '') {
          this.checkSelectedNode(this.defaultValue)
        } else {
          this.clearSelectedNode()
        }
      }
      this.selectData = this.defaultValue || ''
      this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach((ele) => (ele.style.width = 0))
      })
    },
    // 单选，节点被点击时的回调,返回被点击的节点数据
    handleNodeClick(data, node) {
      if (!this.multiple) {
        this.setSelectOption(node)
        this.$emit('change', this.selectData, data)
      }
    },
    // 清除选中
    clearHandle() {
      if (this.multiple) {
        this.selectData = []
      } else {
        this.selectData = ''
      }
      this.clearSelected()
      this.$emit('change', null)
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    // 单选时点击tree节点，设置select选项
    setSelectOption(node) {
      let tmpMap = {}
      tmpMap.value = node?.key
      tmpMap.label = node?.label
      this.options = []
      this.options.push(tmpMap)
      this.selectData = node?.key
      this.$refs.treeSelect.blur()
    },
    // 单选，选中传进来的节点
    checkSelectedNode(checkedKey) {
      this.$refs.selectTree.setCurrentKey(checkedKey)
      let node = this.$refs.selectTree.getNode(checkedKey)
      this.setSelectOption(node)
    },
    // 多选，节点勾选状态发生变化时的回调
    handleCheckChange() {
      let checkedKeys = this.$refs.selectTree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
      this.options = checkedKeys.map((item) => {
        let node = this.$refs.selectTree.getNode(item) // 所有被选中的节点对应的node
        let tmpMap = {}
        tmpMap.value = node.key
        tmpMap.label = node.label
        return tmpMap
      })
      this.selectData = this.options.map((item) => {
        return item.value
      })
      this.$emit('change', this.selectData, this.options)
    },
    // 多选，勾选上传进来的节点
    checkSelectedNodes(checkedKeys) {
      this.$refs.selectTree.setCheckedKeys(checkedKeys)
    },
    // 单选，清空选中
    clearSelectedNode() {
      this.selectedData = ''
      this.$refs.selectTree.setCurrentKey(null)
    },
    // 多选，清空所有勾选
    clearSelectedNodes() {
      let checkedKeys = this.$refs.selectTree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
      for (let i = 0; i < checkedKeys.length; i++) {
        this.$refs.selectTree.setChecked(checkedKeys[i], false)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.props.label].indexOf(value) !== -1
    }
  },
  watch: {
    value() {
      this.defaultValue = this.value
      this.initCheckedData()
    },
    filterText(val) {
      this.$refs.selectTree.filter(val)
    },
    selectData: {
      handler(val) {
        // 如果是多选
        if (Array.isArray(val)) {
          // 如果是多选没值的时候，option不能为空
          if (!val.length) {
            this.options = [
              {
                value: '',
                label: ''
              }
            ]
          }
          this.checkSelectedNodes(val)
        } else {
          // 单选有值
          if (val === '') {
            // 如果是单选没值的时候，option不能为空
            this.options = [
              {
                value: '',
                label: ''
              }
            ]
            this.$refs.selectTree.setCurrentKey(val)
          }
        }
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/base.scss';
// .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
//   height: auto;
//   max-height: 274px;
//   padding: 0;
//   overflow: hidden;
//   overflow-y: auto;
//   @include special-scroll();
// }
.el-tree {
  height: auto;
  max-height: 374px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
  @include special-scroll();
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
.tree-select {
  /deep/ .el-tag {
    .el-tag__close {
      color: #fff;
      &:hover {
        background: $activeColor;
      }
    }
  }
  /deep/.el-icon-circle-close {
    &:hover {
      color: $activeColor;
    }
  }
}
</style>

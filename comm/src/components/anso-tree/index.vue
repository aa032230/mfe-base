<script>
// todo: 如需添加功能,请参考文档 https://github.com/tower1229/Vue-Giant-Tree
import tree from 'vue-giant-tree'
import { cloneDeep } from 'lodash'
import { flatArr } from '../../utils'
function showRemoveBtn(treeId, treeNode) {
  return !treeNode.isFirstNode
}
function showRenameBtn(treeId, treeNode) {
  return !treeNode.isLastNode
}
export default {
  components: {
    tree
  },
  props: {
    treeData: {
      require: true,
      type: Array
    },
    width: {
      type: String,
      default: '300'
    },
    placeholder: {
      type: String,
      default: '仪表编号'
    },
    treeConfig: {
      type: Object,
      default: () => {
        return {
          // check: {
          //   chkStyle: "radio",
          //   enable: true
          // },
          data: {
            simpleData: {
              enable: true,
              pIdKey: 'pid'
            }
          },
          edit: {
            enable: true,
            showRemoveBtn: true,
            showRenameBtn: showRenameBtn,
            drag: {
              isCopy: false, //所有操作都是move
              isMove: true,
              prev: true,
              next: true,
              inner: true
            }
          }
        }
      }
    }
  },
  data() {
    return {
      treeValue: ''
    }
  },
  methods: {
    // 单击
    onClick(evt, treeId, treeNode) {
      this.$emit('treeClick', treeNode)
    },

    // 多选
    onCheck() {
      const checkNodes = this.ztreeObj.getCheckedNodes()
      this.$emit('treeCheck', checkNodes)
    },

    // 初始化tree
    handleCreated(ztreeObj) {
      this.ztreeObj = ztreeObj
      // 获取ztree对象
      this.$emit('handleCreated', ztreeObj)
    },

    // 返回建议数据
    querySearch(queryString, cb) {
      const tree = cloneDeep(this.treeData)
      console.log(tree)
      const restaurants = flatArr(tree, 'children')
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    // 过滤
    createFilter(queryString) {
      return restaurant => {
        return restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },

    // 搜索
    handleSelect(node) {
      const nodes = this.ztreeObj.getNodesByParamFuzzy('name', node.name, null)
      this.ztreeObj.expandNode(nodes[0], true, true, true)
      this.ztreeObj.selectNode(nodes[0])
      this.$emit('select', node)
    }
  },
  // 渲染
  render() {
    const searchAttribute = {
      props: {
        placeholder: this.placeholder,
        value: this.treeValue,
        clearable: true,
        size: 'small',
        valueKey: 'name',
        prefixIcon: 'el-icon-search'
      },
      on: {
        select: this.handleSelect,
        input: value => {
          this.treeValue = value
        }
      }
    }
    const treeAttribute = {
      props: {
        nodes: this.treeData,
        setting: this.treeConfig
      },
      on: {
        onClick: this.onClick,
        onCheck: this.onCheck,
        onCreated: this.handleCreated
      }
    }
    return (
      <div class="tree-aside" style={{ width: this.width + 'px' }}>
        <div class="tree-search">
          <el-autocomplete
            class="inline-input"
            fetch-suggestions={(q, cb) => this.querySearch(q, cb)}
            {...searchAttribute}
          ></el-autocomplete>
        </div>
        <div class="tree-wrap">
          <el-scrollbar class="tree-node" wrapStyle={[{ 'overflow-x': 'hidden' }]}>
            <tree {...treeAttribute} />
          </el-scrollbar>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>

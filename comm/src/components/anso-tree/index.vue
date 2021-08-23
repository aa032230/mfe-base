<script>
// todo: 如需添加功能,请参考文档 https://github.com/tower1229/Vue-Giant-Tree
import tree from 'vue-giant-tree'
import { cloneDeep } from 'lodash'
import { flatArr } from '../../utils'
export default {
  name: 'anso-tree',
  components: {
    tree
  },
  props: {
    treeData: {
      require: true,
      type: Array,
      default: () => []
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
          }
        }
      }
    },
    width: {
      type: String,
      default: '300'
    }
  },
  data() {
    return {
      treeValue: ''
    }
  },
  methods: {
    // 初始化tree
    handleCreated(ztreeObj) {
      this.ztreeObj = ztreeObj
      // 获取ztree对象
      this.$emit('handleCreated', ztreeObj)
    },
    // 单击
    onClick(evt, treeId, treeNode) {
      if (treeNode.isParent) {
        // 去除父级选中颜色
        this.removeParentActiveColor(treeId)
        // 点击父节点，只展开或收缩
        this.ztreeObj.expandNode(treeNode, !treeNode.open)
        return
      }
      this.$emit('diapatchTreeEvent', treeNode)
    },
    // 搜索
    handleSelect(node) {
      const nodes = this.ztreeObj.getNodesByParamFuzzy('name', node.name, null)
      this.ztreeObj.expandNode(nodes[0], true, true, true)
      this.ztreeObj.selectNode(nodes[0])
      if (nodes[0].isParent) {
        // 去除父级选中颜色
        this.removeParentActiveColor(nodes[0].tId)
        return
      }
      this.$emit('diapatchTreeEvent', node)
    },
    // 多选
    onCheck(e, treeId, treeNode) {
      const treeNodes = flatArr([treeNode], 'children')
      // const checkNodes = this.ztreeObj.getCheckedNodes(true)
      this.$emit('select', treeNodes)
    },

    // 去除父节点active背景色
    removeParentActiveColor(tid) {
      const selectParentNode = document.querySelector(`#${tid}`)
      const selectNode = selectParentNode.querySelector('.curSelectedNode')
      selectNode.classList.remove('curSelectedNode')
    },

    // 返回建议数据
    querySearch(queryString, cb) {
      const tree = cloneDeep(this.treeData)
      // let restaurants = void 0
      const restaurants = flatArr(tree, 'children')
      // 设备树只返回仪表
      // if (this.treeType === 'equipment') {
      //     restaurants = result.filter((t) => t.imei || t.fmAddress);
      // } else {
      //     restaurants = result;
      // }
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 过滤
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
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
        input: (value) => {
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

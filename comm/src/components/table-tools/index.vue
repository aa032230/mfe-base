<script>
import Print from 'print-js'
/**
 * demo:
 * toolsConfig: ['refresh', 'print', 'export', 'space', 'setting']
 */
export default {
  name: 'table-tools',
  data() {
    return {
      activeName: '默认',
      spaceMap: ['默认', '紧凑', '中等', '宽松'],
      checkedColumns: []
    }
  },
  props: {
    // 表头原始数据
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // 表格工具展示配置
    toolsConfig: {
      type: Array,
      default() {
        return [] // 根据数据展示对应的工具
      }
    },
    printId: {
      type: String,
      default: 'print'
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.filterColumn()
  },
  methods: {
    // 打印
    handlePrint() {
      new Print({
        header: this.title,
        headerStyle: 'text-align:center',
        printable: 'print',
        type: 'html',
        maxWidth: 1150,
        targetStyles: ['*']
      })
    },
    // 表格间距调整
    adjustSpace(active) {
      this.activeName = active
      let _h = 0
      switch (active) {
        case '默认':
          _h = 30
          break
        case '紧凑':
          _h = 40
          break
        case '中等':
          _h = 50
          break
        case '宽松':
          _h = 60
          break
      }
      this.$emit('setSpace', _h)
    },
    // 表头筛选
    filterColumn() {
      const columns = this.columns.filter((c) => c.checked)
      this.$emit('setCheckedColumns', columns)
    },
    // 选中/取消
    handleChange(item) {
      this.columns.forEach((c) => {
        if (c.prop === item.prop) {
          c.checked = !c.checked
        }
      })
      this.filterColumn()
    },
    // 下载
    handleExprot() {
      this.$emit('export')
    },

    // 工具筛选
    switchTool() {
      const { handlePrint, spaceMap, columns, handleChange, adjustSpace, handleExprot, toolsConfig } = this
      if (!toolsConfig.length) return
      return toolsConfig.map((t) => {
        switch (t) {
          case 'refresh':
            return (
              <em
                class="el-icon-refresh"
                title="刷新"
                onClick={() => {
                  window.location.reload()
                }}
              ></em>
            )
          case 'print':
            return <em class="el-icon-document-copy" title="打印" onClick={handlePrint}></em>
          case 'export':
            return <em class="el-icon-download" title="下载" onClick={handleExprot}></em>
          case 'space':
            return (
              <el-popover
                placement="bottom"
                trigger="click"
                class="table-tools-item"
                width="100"
                popper-class="table-tools-popover"
              >
                <ul class="table-tools-item-ul">
                  {spaceMap.map((item) => {
                    return (
                      <li class={{ 'is-active': this.activeName === item }} onClick={adjustSpace.bind(this, item)}>
                        {item}
                      </li>
                    )
                  })}
                </ul>
                <em class="el-icon-s-grid" slot="reference" title="间距调整"></em>
              </el-popover>
            )
          case 'setting':
            return (
              <el-popover placement="bottom" trigger="click" class="table-tools-item">
                <el-checkbox-group size="mini" v-model={this.checkedColumns}>
                  {columns.map((c) => {
                    return (
                      <el-checkbox
                        key={c.prop}
                        label={c.label}
                        checked={c.checked}
                        value={c.prop}
                        onChange={handleChange.bind(this, c)}
                      ></el-checkbox>
                    )
                  })}
                </el-checkbox-group>
                <em class="el-icon-setting" slot="reference" title="筛选"></em>
              </el-popover>
            )
          default:
            break
        }
      })
    }
  },
  render() {
    return <div class="table-tools">{this.switchTool()}</div>
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
<style lang="scss">
.table-tools-popover {
  min-width: 100px !important;
  padding: 0 !important;
}
.el-checkbox-group {
  width: 180px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-checkbox {
    margin: 0;
    width: 80px;
  }
  .el-checkbox:nth-of-type(odd) {
    margin-right: 20px;
  }
}
</style>

<script>
import Print from 'print-js'
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
    printId: {
      type: String,
      default: 'print'
    },
    sourceColumns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.filterColumn()
  },
  methods: {
    // 打印
    handlePrint() {
      console.log(this.$parent)
      new Print({
        header: this.$parent.title,
        headerStyle: 'text-align:center',
        printable: this.printId,
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
      this.$emit('getSpace', _h)
    },
    // 表头筛选
    filterColumn() {
      const columns = this.sourceColumns.filter((c) => c.checked)
      this.$emit('getCheckedColumns', columns)
    },
    // 选中/取消
    handleChange(item) {
      this.sourceColumns.forEach((c) => {
        if (c.prop === item.prop) {
          c.checked = !c.checked
        }
      })
      this.filterColumn()
    },
    // 下载
    handleExprot() {
      this.$emit(this.handleExprot)
    }
  },
  render() {
    const { handlePrint, spaceMap, sourceColumns, handleChange, adjustSpace, handleExprot } = this
    return (
      <div class="table-tools">
        <em
          class="el-icon-refresh"
          title="刷新"
          onClick={() => {
            window.location.reload()
          }}
        ></em>
        <em class="el-icon-document-copy" title="打印" onClick={handlePrint}></em>
        <em class="el-icon-download" title="下载" onClick={handleExprot}></em>
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
        <el-popover placement="bottom" trigger="click" class="table-tools-item">
          <el-checkbox-group size="mini" v-model={this.checkedColumns}>
            {sourceColumns.map((c) => {
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
      </div>
    )
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

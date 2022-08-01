<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      searchParams: {}
    }
  },
  methods: {
    /**
     * 获取Select的option选项
     * @param data
     * @param options
     * @returns
     */
    getOptions(
      data,
      options = {
        isAddDefault: true
      }
    ) {
      const optionEles = (data || []).map((item) => (
        <el-option key={item.id} value={item.id}>
          {item.text}
        </el-option>
      ))

      if (options?.isAddDefault) {
        optionEles.unshift(<el-option value="21" label="请选择111111111111" />)
      }

      return optionEles
    },
    goTo(num, e) {
      e.preventDefault()
    //   if (!stockInfo || !searchParams) {
    //     return
    //   }
    //   const { page, pageCount } = stockInfo
    //   if (page === 1 && num === -1) {
    //     return
    //   }
    //   if (pageCount <= page) {
    //     return
    //   }
    }
  },
  render() {
    const { searchParams, goTo } = this
    return (
      <el-form size="small" class="scm-search-form" inline>
        <el-form-item label="分析仓库:" prop="analysisWarehouseId">
          <el-select size="mini" v-model={searchParams.analysisWarehouseId} style="width: 100px">
            {this.getOptions()}
          </el-select>
        </el-form-item>
        <el-form-item label="销售区域:" prop="salesGroupId">
          <el-select size="mini" v-model={searchParams.salesGroupId} style="width: 100px">
            {this.getOptions()}
          </el-select>
        </el-form-item>
        <el-form-item label="销售渠道:" prop="channelId">
          <el-select size="mini" v-model={searchParams.channelId} style="width: 100px">
            {this.getOptions()}
          </el-select>
        </el-form-item>
        <el-form-item label="品牌:" prop="brandIds">
          <el-select size="mini" v-model={searchParams.brandIds} style="width: 100px">
            {this.getOptions()}
          </el-select>
        </el-form-item>
        <el-form-item label="型号:" prop="modelIds">
          <el-input size="mini" v-model={searchParams.modelIds} type="text" style="width: 100px" />
        </el-form-item>
        <el-form-item label="型系:" prop="modelGroupIds">
          <el-input size="mini" v-model={searchParams.modelGroupIds} type="text" style="width: 100px" />
        </el-form-item>
        <el-form-item label="是否采购:" prop="isPurchase">
          <el-select size="mini" v-model={searchParams.isPurchase} style="width: 100px">
            {this.getOptions()}
          </el-select>
        </el-form-item>
        <el-form-item label="IS PAN_EN:" prop="isPanEu">
          <el-select size="mini" v-model={searchParams.isPanEu} style="width: 100px">
            {this.getOptions()}
          </el-select>
        </el-form-item>
        <el-form-item label="SKU:" prop="sku">
          <el-input size="mini" v-model={searchParams.sku} type="text" style="width: 100px" />
        </el-form-item>
        <el-form-item label="显示周数:" prop="weekNum">
          <el-input size="mini" v-model={searchParams.weekNum} type="text" style="width: 100px" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary">
            查询
          </el-button>
          <el-button size="mini">保存</el-button>
        </el-form-item>
        <div class="page-tool">
          <a onClick={(e) => goTo(-1, e)} title="上一页">
            prev
          </a>
          <span style={{ margin: '0 8px' }}>
            1 / 2
          </span>
          <a onClick={(e) => goTo(1, e)}>next</a>
        </div>
      </el-form>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

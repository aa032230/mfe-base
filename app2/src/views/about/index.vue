<script>
export default {
  data() {
    return {
      form: {},
      formParams: {},
      formVisble: false,
      a: {
        name: 1,
        text: 2,
        b: [
          {
            name: 1,
            text: 2,
            c: [
              {
                name: 1,
                text: 2,
                d: [
                  {
                    name: 1,
                    text: 2,
                    e: [
                      {
                        name: 1,
                        text: 2
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: 1,
            text: 2,
            c: [
              {
                name: 1,
                text: 2,
                d: [
                  {
                    name: 1,
                    text: 2
                  },
                  {
                    name: 1,
                    text: 2
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    handleAdd() {
      const { form } = this
      this.$set(form, 'params', {})
      this.formVisble = true
      console.log(this.formParams)
      // return this.createFormItem(form.params)
    },
    handleSumbit() {
      console.log(this.formParams)
    },
    createFormItem(params) {
      return (
        <div class="form-wrap-params">
          <el-form label-position="top" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model={params.name}></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model={params.region}></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model={params.type}></el-input>
            </el-form-item>
            <el-form-item label="输入参数">
              <el-button on-click={this.handleAdd}>添加参数</el-button>
              {Array.isArray(params.children) &&
                params.children.map((p, index) => {
                  return (
                    <div key={index} style="display:flex">
                      <span>{p.name}</span>
                      <div style="padding-left: 50px">
                        <el-link style="padding-right: 10px">编辑</el-link>
                        <el-link>删除</el-link>
                      </div>
                    </div>
                  )
                })}
            </el-form-item>
            <el-form-item>
              <el-button>取消</el-button>
              <el-button on-click={this.handleSumbit} type="primary">
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      )
    }
  },
  render() {
    const { form, formParams, formVisble } = this
    return (
      <div class="form-wrap">
        <div class="form-wrap-item">
          <el-form label-position="top" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model={form.name}></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model={form.region}></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model={form.type}></el-input>
            </el-form-item>
            <el-form-item label="输入参数">
              <el-button on-click={this.handleAdd}>添加参数</el-button>
              {Array.isArray(formParams) &&
                formParams.map((p, index) => {
                  return (
                    <div key={index} style="display:flex">
                      <span>{p.name}</span>
                      <div style="padding-left: 50px">
                        <el-link style="padding-right: 10px">编辑</el-link>
                        <el-link>删除</el-link>
                      </div>
                    </div>
                  )
                })}
            </el-form-item>
            <el-form-item>
              <el-button>取消</el-button>
              <el-button on-click={this.handleSumbit} type="primary">
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        {formVisble ? this.createFormItem({}) : ''}
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

<script>
import test from './test.vue'
export default {
  data() {
    return {
      form: {},
      formParams: {},
      formVisble: false,
      fIndex: 0,
      formArr: [],
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
  mounted() {},
  methods: {
    handleAdd1() {
      const { formArr, formParams } = this
      formArr.push(formParams)
      this.formParams = {}
      // return this.createFormItem(form.params)
    },
    handleAdd() {
      // this.formVisble = true
      this.ansoDialog({
        title: '哈哈哈哈',
        component: test,
        cancleText: '',
        callback(ctx) {
        }
      })
    },
    handleSumbit() {
      const { formParams, formArr, form } = this
      const _len = formArr.length
      const _target = formArr[_len - 1]
      if (_len) {
        if (_target.children && Array.isArray(_target.children)) {
          _target.children.push(formParams)
        } else {
          _target.children = [formParams]
        }
      } else {
        if (form.children && Array.isArray(form.children)) {
          form.children.push(formParams)
        } else {
          form.children = [formParams]
        }
      }
      if (_target) {
        this.formParams = _target
        this.formArr.pop()
      } else {
        this.formParams = {}
        this.formVisble = false
      }
      console.log(form)
    },
    handleConfirm() {
      const s = this.formatData(this.formArr)
      console.log(s)
    },

    // 整理数据格式
    formatData(params) {
      const _len = params.length
      if (!_len) return
      const pIndex = params[_len - 2]
      if (params[pIndex].children && Array.isArray(params[pIndex])) {
        params[pIndex].children.push(params[_len - 1])
      } else {
        params[pIndex].children = [params[_len - 1]]
      }
      params.pop()
      if (_len - 1 > 0) {
        this.formatData(params)
      }
      return params
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
              {Array.isArray(form.params) &&
                form.params.map((p, index) => {
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
              <el-button on-click={this.handleConfirm} type="primary">
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        {formVisble ? (
          <div class="form-wrap-params">
            <el-form label-position="top" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model={formParams.name}></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input v-model={formParams.region}></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input v-model={formParams.type}></el-input>
              </el-form-item>
              <el-form-item label="输入参数">
                <el-button on-click={this.handleAdd1}>添加参数</el-button>
                {Array.isArray(formParams.params) &&
                  formParams.params.map((p, index) => {
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
        ) : (
          ''
        )}
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

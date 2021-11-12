<script>
import { ansoTreeSelect, ansoDatePicker } from '../'
export default {
  name: 'anso-form',
  props: {
    formList: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    formConfig: {
      type: Object,
      default: () => ({})
    },
    itemConfig: {
      type: Object,
      default: () => ({})
    },
    itemRow: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    this.initForm()
    // 渲染完后再调异步数据
    this.$nextTick(() => {
      this.formList.forEach((item) => {
        if (typeof item.options === 'function') {
          item.options(item)
        }
      })
    })
  },
  methods: {
    // 初始化表单
    initForm() {
      const { formList, value } = this
      Array.isArray(formList) &&
        formList.forEach((f) => {
          if (value[f.field] !== undefined) return
          if (f.model !== undefined) {
            this.$set(value, f.field, f.model)
          } else {
            if (f.type === 'select') return
            this.$set(value, f.field, '')
          }
        })
    },
    // 表单元素构建
    createFormItem(formList) {
      return formList.map((f) => {
        return (
          <el-col span={24 / (f.itemRow ? f.itemRow : this.itemRow)}>
            <el-form-item props={{ prop: f.field, ...this.itemConfig }} key={f.field}>
              <div slot="label" class="label-wrap">
                <div>{f.name}</div>
                {f.tips ? (
                  <el-tooltip content={f.tips} placement="top" effect="light">
                    <span class="el-icon-question icon"></span>
                  </el-tooltip>
                ) : (
                  ''
                )}
              </div>
              {this.checkTypeToFormElement(f)}
            </el-form-item>
          </el-col>
        )
      })
    },
    // 根据type渲染对应的form组件
    checkTypeToFormElement(r) {
      const form = this.value
      let _options = void 0
      switch (r.type) {
        case 'select':
          _options = typeof r.options === 'function' ? [] : r.options
          return (
            <el-select
              style={{ width: r.width }}
              v-model={form[r.field]}
              size={r.size ? r.size : 'small'}
              {...this.createFormAttrs(r)}
            >
              {Array.isArray(_options) &&
                _options.map((option) => <el-option key={option.value} props={{ ...option }} />)}
            </el-select>
          )
        case 'switch':
          return <el-switch v-model={form[r.field]} {...this.createFormAttrs(r)}></el-switch>
        case 'cascader':
          return (
            <el-cascader
              v-model={form[r.field]}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width }}
              {...this.createFormAttrs(r)}
            ></el-cascader>
          )
        case 'date':
          return (
            <ansoDatePicker
              v-model={form[r.field]}
              type={r.dateType}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width }}
              {...this.createFormAttrs(r)}
            ></ansoDatePicker>
          )
        case 'radios':
          _options = typeof r.options === 'function' ? [] : r.options
          return (
            <el-radio-group v-model={form[r.field]} {...this.createFormAttrs(r)}>
              {Array.isArray(_options) &&
                _options.map((option) => {
                  return <el-radio {...this.createFormAttrs(option)}>{option.text}</el-radio>
                })}
            </el-radio-group>
          )
        case 'checkboxs':
          if (!Array.isArray(form[r.field])) {
            this.$set(form, r.field, [])
          }
          _options = typeof r.options === 'function' ? [] : r.options
          return (
            <el-checkbox-group v-model={form[r.field]} {...this.createFormAttrs(r)}>
              {Array.isArray(_options) &&
                _options.map((option) => {
                  return <el-checkbox {...this.createFormAttrs(option)}></el-checkbox>
                })}
            </el-checkbox-group>
          )
        case 'treeSelect':
          return <ansoTreeSelect v-model={form[r.field]} {...this.createFormAttrs(r)}></ansoTreeSelect>
        // 自定义
        case 'custom':
          return r.custom(form[r.field])
        case 'slot':
          return this.$slots[r.field]
        default:
          return (
            <el-input
              size={r.size ? r.size : 'small'}
              style={{ width: r.width }}
              v-model={form[r.field]}
              type={r.type ? r.type : 'text'}
              {...this.createFormAttrs(r)}
            ></el-input>
          )
      }
    },
    // 属性和事件导入
    createFormAttrs(formOptions) {
      const _props = {}
      const _event = {}
      const _native = {}
      // todo: 没加上的方法自己加入数组
      const _methods = ['change', 'select', 'input', 'clear', 'focus', 'blur', 'click']
      Object.keys(formOptions).forEach((m) => {
        if (_methods.includes(m)) {
          Object.assign(_event, { [m]: formOptions[m] })
        } else {
          // 键盘事件处理
          switch (m) {
            case 'keyup':
              Object.assign(_native, { [m]: formOptions[m] })
              break
            case 'enter':
              Object.assign(_native, {
                keyup: (e) => {
                  if (e.keyCode !== 13) return
                  return formOptions[m](e.target.value)
                }
              })
              break
            case 'field':
            case 'width':
            case 'options':
            case 'type':
            case 'name':
            case 'model':
            case 'text':
            case 'size':
            case 'dateType':
              break
            default:
              Object.assign(_props, { [m]: formOptions[m] })
              break
          }
        }
      })
      return {
        attrs: _props,
        on: _event,
        nativeOn: _native
      }
    }
  },
  render() {
    const { model, rules, labelWidth, labelPosition, formList, formConfig } = this
    return (
      <el-form
        nativeOnSubmit={(e) => e.preventDefault()}
        props={{
          model: model ? model : this.value,
          rules,
          labelPosition,
          labelWidth,
          inline: true,
          ...formConfig,
          'validate-on-rule-change': false
        }}
        ref="ruleForm"
        class="form"
      >
        <el-row type="flex" class="form-row" gutter={15}>
          {this.createFormItem(formList)}
        </el-row>
      </el-form>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
<style>
.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::before {
  content: '';
  margin-right: 0;
}
.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label::after {
  content: '*';
  color: #f56c6c;
  margin-left: 4px;
}
input,
textarea {
  color: #262626 !important;
}
</style>

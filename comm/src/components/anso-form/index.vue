<script>
import { DataBus } from '../../utils/'
import { ansoTreeSelect } from '../'
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
    DataBus.on('reset', (res) => res && this.initForm())
  },
  watch: {
    formList: {
      handler() {
        this.initForm()
      },
      deep: true
    }
  },
  methods: {
    // 初始化表单
    initForm() {
      const { formList, value } = this
      Array.isArray(formList) &&
        formList.forEach((f) => {
          if (f.model !== undefined && !value[f.field]) {
            this.$set(value, f.field, f.model)
          } else {
            if (f.type !== 'select') {
              this.$set(value, f.field, '')
            }
          }
        })
    },
    // 表单元素构建
    createFormItem(formList) {
      return formList.map((f) => {
        return (
          <el-col span={24 / (f.itemRow ? f.itemRow : this.itemRow)}>
            <el-form-item props={{ label: f.name, prop: f.field, ...this.itemConfig }} key={f.field}>
              {this.checkTypeToFormElement(f)}
            </el-form-item>
          </el-col>
        )
      })
    },
    // 根据type渲染对应的form组件
    checkTypeToFormElement(r) {
      const form = this.value
      switch (r.type) {
        case 'select':
          return (
            <el-select
              style={{ width: r.width }}
              v-model={form[r.field]}
              size={r.size ? r.size : 'small'}
              {...this.createFormAttrs(r)}
            >
              {r.options.map((option) => (
                <el-option key={option.value} props={{ ...option }} />
              ))}
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
        case 'datePicker':
          return (
            <el-date-picker
              v-model={form[r.field]}
              type={r.type}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width }}
              {...this.createFormAttrs(r)}
            ></el-date-picker>
          )
        case 'radios':
          return (
            <el-radio-group v-model={form[r.field]} {...this.createFormAttrs(r)}>
              {r.options.map((option) => {
                return <el-radio {...this.createFormAttrs(option)}>{option.text}</el-radio>
              })}
            </el-radio-group>
          )
        case 'checkboxs':
          if (!Array.isArray(form[r.field])) {
            this.$set(form, r.field, [])
          }
          return (
            <el-checkbox-group v-model={form[r.field]} {...this.createFormAttrs(r)}>
              {r.options.map((option) => {
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
    const { value, rules, labelWidth, labelPosition, formList, formConfig } = this
    return (
      <el-form
        props={{
          model: value,
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
</style>

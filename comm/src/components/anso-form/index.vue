<script>
/**
 *  表单组件
 *  <v-form v-model="form" :form-list="formList" rules="rules"></v-form>
 * demo:
 *  [
 *  {
 *    name: '系统模块',
 *    field: 'a1',
 *    input: val => val
 *  },
 *  {
      name: '系统模块系统模块',
      field: 'a2',
      width: 220,
      type: 'select',
      change:(val) => console.log(val)
      options: [
        {
          value: 0,
          label: '小籠包'
        },
        {
          value: 1,
          label: '叉烧包'
        }
      ]
    },
 *
 * ]
 *
 */
import { DataBus } from '../../utils/'
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
    // 初始化表单字段
    initForm() {
      const { formList, value } = this
      Array.isArray(formList) &&
        formList.forEach((f) => {
          if (f.model || f.model === 0) {
            this.$set(value, f.field, f.model)
          } else {
            this.$set(value, f.field, '')
          }
        })
    },
    // 表单元素构建
    createFormItem(formList) {
      return formList.map((f) => {
        return (
          <el-form-item label={f.name ? `${f.name}:` : ''} prop={f.field} key={f.field}>
            {this.checkTypeToFormElement(f)}
          </el-form-item>
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
              style={{ width: r.width ? r.width : '150px' }}
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
              style={{ width: r.width ? r.width : '150px' }}
              {...this.createFormAttrs(r)}
            ></el-cascader>
          )
        case 'datePicker':
          return (
            <el-date-picker
              v-model={form[r.field]}
              type={r.type}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width : '150px' }}
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
        default:
          return (
            <el-input
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width : '150px' }}
              v-model={form[r.field]}
              type={r.type ? r.type : 'text'}
              {...this.createFormAttrs(r)}
            ></el-input>
          )
      }
    },
    // 表单属性导入
    createFormAttrs(formOptions) {
      const _props = {}
      const _event = {}
      // todo: 没加上的方法自己加入数组
      const _methods = ['change', 'select', 'input', 'clear', 'focus', 'blur', 'click']
      Object.keys(formOptions).forEach((m) => {
        if (_methods.includes(m)) {
          Object.assign(_event, { [m]: formOptions[m] })
        } else {
          switch (m) {
            case 'field':
            case 'width':
            case 'size':
            case 'options':
            case 'type':
            case 'name':
            case 'model':
            case 'text':
              break
            default:
              Object.assign(_props, { [m]: formOptions[m] })
              break
          }
        }
      })
      return {
        attrs: _props,
        on: _event
      }
    }
  },
  render() {
    const { model, rules, labelWidth, labelPosition, formList, formConfig } = this
    return (
      <el-form
        props={{ ...formConfig, model, rules }}
        ref="ruleForm"
        class="form"
        label-position={labelPosition}
        label-width={labelWidth}
      >
        {this.createFormItem(formList)}
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

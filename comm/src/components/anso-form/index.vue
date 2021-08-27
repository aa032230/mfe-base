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
              filterable={r.filterable}
              size={r.size ? r.size : 'small'}
              disabled={r.disabled}
              clearable={r.clearable}
              placeholder={r.placeholder}
              on={this.setFormActions(r)}
            >
              {r.options.map((option) => (
                <el-option key={option.value} label={option.label} value={option.value} />
              ))}
            </el-select>
          )
        case 'switch':
          return (
            <el-switch
              v-model={form[r.field]}
              active-value={r.activeValue}
              inactive-value={r.inactiveValue}
            ></el-switch>
          )
        case 'cascader':
          return (
            <el-cascader
              v-model={form[r.field]}
              options={r.options}
              disabled={r.disabled}
              placeholder={r.placeholder}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width : '150px' }}
              value-key={r.valueKey}
              on={this.setFormActions(r)}
            ></el-cascader>
          )
        case 'datePicker':
          return (
            <el-date-picker
              v-model={form[r.field]}
              type={r.type}
              format={r.format}
              placeholder={r.placeholder}
              picker-options={r.pickerOptions}
              default-time={r.defaultTime}
              value-format={r.valueType}
              default-value={r.defaultValue}
              range-separator={r.separator}
              start-placeholder={r.startPlaceholder}
              end-placeholder={r.endPlaceholder}
              disabled={r.disabled}
              on={this.setFormActions(r)}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width : '150px' }}
            ></el-date-picker>
          )
        case 'radio':
          return (
            <el-radio
              v-model={form[r.field]}
              label={r.value}
              disabled={r.disabled}
              size={r.size}
              text-color={r.textColor}
              fill={r.fill}
              on={this.setFormActions(r)}
            >
              {r.label}
            </el-radio>
          )
        case 'checkbox':
          return (
            <el-checkbox v-model={form[r.field]} disabled={r.disabled} size={r.size} on={this.setFormActions(r)}>
              {r.label}
            </el-checkbox>
          )
        default:
          return (
            <el-input
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width : '150px' }}
              v-model={form[r.field]}
              disabled={r.disabled}
              placeholder={r.placeholder}
              maxlength={r.maxlength}
              type={r.type ? r.type : 'text'}
              clearable={r.clearable}
              prefix-icon={r.prefixIcon}
              suffix-icon={r.suffixIcon}
              on={this.setFormActions(r)}
            ></el-input>
          )
      }
    },
    // 表单元素方法导入
    setFormActions(formOptions) {
      const _props = {}
      // todo: 没加上的方法自己加入数组
      const _methods = ['change', 'select', 'input', 'clear', 'focus', 'blur']
      Object.keys(formOptions).forEach((m) => {
        if (_methods.includes(m)) {
          Object.assign(_props, { [m]: formOptions[m] })
        }
      })
      return _props
    }
  },
  render() {
    const { model, rules, labelWidth, labelPosition, formList } = this
    return (
      <el-form
        props={{ model, rules }}
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

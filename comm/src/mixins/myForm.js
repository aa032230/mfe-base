export default {
  methods: {
    // 表单元素方法导入
    setFormActions(formOptions) {
      const _props = {}
      // todo: 没加上的方法自己加入数组
      const _methods = ['change', 'select', 'input', 'clear', 'focus', 'blur']
      Object.keys(formOptions).forEach((f) => {
        // switch (f) {
        //   case 'change':
        //   case 'select':
        //   case 'input':
        //   case 'clear':
        //   case 'focus':
        //   case 'blur':
        //     Object.assign(_props.on, { [f]: formOptions[f] })
        //     break
        //   default:
        //     break
        // }
        if (_methods.includes(f)) {
          Object.assign(_props, { [f]: formOptions[f] })
        }
      })
      return _props
    },
    // 根据type渲染对应的from组件
    checkTypeToFormElement(r) {
      switch (r.type) {
        case 'select':
          return (
            <el-select
              style={{ width: r.width ? r.width + 'px' : '150px' }}
              v-model={this.form[r.field]}
              filterable={r.filterable}
              size={r.size ? r.size : 'small'}
              disabled={r.disabled}
              placeholder={r.placeholder}
              on={this.setFormActions(r)}
            >
              {r.options.map((option) => (
                <el-option key={option.value} label={option.label} value={option.value} />
              ))}
            </el-select>
          )
        case 'switch':
          return <el-switch v-model={this.form[r.field]}></el-switch>
        case 'cascader':
          return (
            <el-cascader
              v-model={this.form[r.field]}
              options={r.options}
              onChange={r.method}
              disabled={r.disabled}
              placeholder={r.placeholder}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width + 'px' : '150px' }}
              value-key={r.valueKey}
              on={this.setFormActions(r)}
            ></el-cascader>
          )
        case 'datePicker':
          return (
            <el-date-picker
              v-model={this.form[r.field]}
              type={r.type}
              format={r.format}
              placeholder={r.placeholder}
              default-time={r.defaultTime}
              value-format={r.valueType}
              default-value={r.defaultValue}
              range-separator={r.separator}
              start-placeholder={r.startPlaceholder}
              end-placeholder={r.endPlaceholder}
              disabled={r.disabled}
              on={this.setFormActions(r)}
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width + 'px' : '150px' }}
            ></el-date-picker>
          )
        case 'radio':
          return (
            <el-radio
              v-model={this.form[r.field]}
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
            <el-checkbox v-model={this.form[r.field]} disabled={r.disabled} size={r.size} on={this.setFormActions(r)}>
              {r.label}
            </el-checkbox>
          )
        default:
          return (
            <el-input
              size={r.size ? r.size : 'small'}
              style={{ width: r.width ? r.width + 'px' : '150px' }}
              v-model={this.form[r.field]}
              disabled={r.disabled}
              placeholder={r.placeholder}
              maxlength={r.maxlength}
              clearable={r.clearable}
              prefix-icon={r.prefixIcon}
              suffix-icon={r.suffixIcon}
              on={this.setFormActions(r)}
            ></el-input>
          )
      }
    }
  }
}

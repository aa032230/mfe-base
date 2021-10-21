/**
 *  提示框封装
 */

/**
 *  // type: success | error | undefined(默认不传)
 * this.$ansoConfirm({ title: '哈哈哈', message: temp, type: 'success' })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
 */
export default class ansoPrompt {
  constructor(vm, options) {
    this.vue = vm
    this.options = options
  }
  // confirm
  initConfirm() {
    const { title, confirmAttrs } = this.filterConfirmArgement()
    const { type, message } = confirmAttrs
    return new Promise((resolve, reject) => {
      this.vue
        .$confirm(message, title, {
          ...confirmAttrs,
          ...this.withTypeSetClass(type),
          dangerouslyUseHTMLString: true
        })
        .then((confirm) => {
          resolve(confirm)
        })
        .catch((cancel) => {
          reject(cancel)
        })
    })
  }

  // alert
  initAlert() {
    const { title, confirmAttrs } = this.filterConfirmArgement()
    const { type, message } = confirmAttrs
    this.vue.$alert(message, title, {
      ...confirmAttrs,
      ...this.withTypeSetClass(type),
      dangerouslyUseHTMLString: true
    })
  }
  // 根据类型命中对应参数
  withTypeSetClass(type) {
    const attr = {
      iconClass: 'el-icon-warning',
      customClass: 'anso-confirm',
      confirmButtonClass: 'btn-primary'
    }
    switch (type) {
      case 'error':
        attr.customClass = 'anso-confirm-error'
        attr.confirmButtonClass = 'btn-error'
        break
      case 'success':
        attr.customClass = 'anso-confirm-success'
        attr.iconClass = 'el-icon-success'
        break
      default:
        break
    }
    return attr
  }

  // 参数过滤
  filterConfirmArgement() {
    let title = '提示'
    let confirmAttrs = {}
    Object.keys(this.options).forEach((k) => {
      switch (k) {
        case 'title':
          title = this.options[k]
          break
        default:
          confirmAttrs = Object.assign(confirmAttrs, { [k]: this.options[k] })
      }
    })
    return {
      title,
      confirmAttrs: { ...{ confirmButtonText: '确定', cancelButtonText: '取消', ...confirmAttrs } }
    }
  }
}

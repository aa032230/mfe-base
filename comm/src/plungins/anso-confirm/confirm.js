import Vue from 'vue'
// 弹窗警告封装
export default class AnsoConfirm {
  constructor(vm, options) {
    this.vue = vm
    this.options = options
    return this.initConfirm()
  }
  // confirm
  initConfirm() {
    const { title, confirmAttrs } = this.filterConfirmArgement()
    const message = this.createFragment(this.options.message)
    // const t = this.createFragment(title)
    // console.log(t)
    return new Promise((resolve, reject) => {
      this.vue
        .$confirm(message, title, {...confirmAttrs, type:'success',center: true})
        .then((confirm) => {
          resolve(confirm)
        })
        .catch((cancel) => {
          reject(cancel)
        })
    })
  }

  // 格式化标题
  createTitleFargment(title) {
    const titleStr = `
      <div class='confirm-title'>
        <em icon="el-icon-warning"></em>
        <span>${title}</span>
      </div>
    `
    return this.createFragment(titleStr)
  }
  // 参数过滤
  filterConfirmArgement() {
    let title = '标题'
    const confirmAttrs = {}
    Object.keys(this.options).forEach((k) => {
      switch (k) {
        case 'title':
          title = this.options[k]
          break
        case 'message':
          break
        default:
          Object.assign(confirmAttrs, { [k]: this.options[k] })
      }
    })
    return {
      title,
      confirmAttrs: { ...{ confirmButtonText: '确定', cancelButtonText: '取消', ...confirmAttrs } }
    }
  }

  // 将字符串转换html
  createFragment(fargment) {
    const _html = `<div>${fargment}</div>`
    const f = Vue.compile(_html)
    return this.vue.$createElement(f)
  }
}

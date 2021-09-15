// 定义dialog方法
import dialog from './dialog.vue'
/**
 *
 * @param {*} ctx vue实例
 * @returns  dialog插件方法
 */
export default function (ctx) {
  const DialogConstructor = ctx.extend(dialog)
  let instance
  return function (options) {
    options = options || {}
    instance = new DialogConstructor({
      data: options
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.visible = true
    return instance
  }
}

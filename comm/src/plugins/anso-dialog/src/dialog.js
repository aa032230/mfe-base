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
    options.confirmText = options.confirmText !== undefined ? options.confirmText : '确定'
    options.cancleText = options.cancleText !== undefined ? options.cancleText : '取消'
    options.title = options.title || '提示'
    instance = new DialogConstructor({
      data: options
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    instance.visible = true
    instance.form = {}

    return instance
  }
 
}

function confirm(ctx) {
  ctx.visible = false
}

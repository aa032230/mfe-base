/**
 *
 * @param {*} el  挂载对象
 * @param {*} App  渲染对象
 * @param {*} options  Vue实例数据总线
 */
import { checkType } from './utils'
export default function renderApp(Vue, App, options) {
  const instance = new Vue(Object.assign(usePlugins(Vue, options), { render: (h) => h(App) }))
  // window.__SetSubAppLoading__ = setSubAppLoading(instance)
  return instance
}

/**
 *
 * @param {*} vm
 * @param {Object} options
 * @returns {Object} vmOptions
 */
function usePlugins(vm, options) {
  const vmOptions = {}
  for (const [k, v] of Object.entries(options)) {
    switch (checkType(v)) {
      case 'function':
        v(vm)
        break
      case 'array':
        v.forEach((item) => {
          if (_hasOwnProperty(item, 'components')) {
            item.components.forEach((c) => vm.use(c))
            item.install && item.install(vm)
          } else if (_hasOwnProperty(item, 'install')) {
            item.install(vm)
          } else {
            vm.use(item)
          }
        })
        break
      default:
        Object.assign(vmOptions, { [k]: v })
        break
    }
  }
  return vmOptions
}

// 查看对象是否包含某属性
function _hasOwnProperty(source, key) {
  return Object.prototype.hasOwnProperty.call(source, key)
}

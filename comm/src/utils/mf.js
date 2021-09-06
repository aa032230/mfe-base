import actions from './actions'
import { ansoConfirm } from '../plugins'
if (isLoadInSubAppContainer()) {
  /* eslint no-undef: "off" */
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

export function isLoadInSubAppContainer() {
  return window.__POWERED_BY_QIANKUN__
}
export function wrapStartup(startup) {
  let { render, App, config, Vue } = startup

  let app = null

  return {
    async bootstrap() {},
    async mount(props) {
      if (!config.plugins) config.plugins = []
      config.plugins.push(ansoConfirm)
      window.__CONTEXT__ = {
        $data: props.data,
        $utils: Object.assign({}, props.utils)
      }
      config.plugins.push({
        install: function (v) {
          v.prototype.__CONTEXT__ = window.__CONTEXT__
        }
      })
      actions.setActions(props)
      app = render(Vue, App, config, props)
    },
    async unmount(props) {
      app && app.$destroy && app.$destroy()
      // app.$el.innerHTML = ''
      app = null
    },
    async update(props) {}
  }
}

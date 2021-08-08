
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'
const _apps = {}

const _global = window['__MF_CONFIG__'] = {}

/**
 * @param {*} apps  微应用信息集合
 */
export function registerAndStart(apps) {
  apps.forEach(app => {
    _global[app.name] = {
      activeBase: app.activeRule
    }
  })

  registerMicroApps(apps, {
    async beforeLoad(app) { },
    async beforeMount(app) { },
    async afterMount(app) {
      _apps[app.name] = app
    },
    async beforeUnmount(app) {
      if (_apps[app.name]) {
        delete _apps[app.name]
      }
    },
    async afterUnmount(app) { }
  })
  // 设置默认加载的微应用
  setDefaultMountApp(apps[0].activeRule)
  start({
    getPublicPath: entry => {
      let baseUrl = entry
      if (baseUrl.indexOf('://') < 0) {
        baseUrl = location.protocol + '//' + baseUrl.replace(/^\/+/, '')
      }
      if (!baseUrl.endsWith('/')) baseUrl += '/'
      return baseUrl
    }
  })
}

export function createDefaultAppConfig(vm) {
  return {
    props: {
      data: {
        msg: '测试一下'
      },
      utils: {}
    }
  }
}

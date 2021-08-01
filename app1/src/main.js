import { isLoadInSubAppContainer, wrapStartup } from 'comm/src/utils/mf'
import { startup } from 'utils'
// console.log(window, location, window.__POWERED_BY_QIANKUN__, window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)

const { bootstrap, mount, unmount, update } = wrapStartup(startup)

export { bootstrap, mount, unmount, update }

// 单独开发环境
if (!isLoadInSubAppContainer()) {
  startup.render(startup.Vue, startup.App, startup.config)
}

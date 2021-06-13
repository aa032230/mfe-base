import { isLoadInSubAppContainer, wrapStartup } from 'comm/src/utils/mf'
// 按需加载
import { startup } from 'utils'
// console.log(window, location, window.__POWERED_BY_QIANKUN__, window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
// 单独开发环境
const { bootstrap, mount, unmount, update } = wrapStartup(startup)

export { bootstrap, mount, unmount, update }

if (!isLoadInSubAppContainer()) {
  startup.Render(startup.Vue, startup.App, startup.Config)
}

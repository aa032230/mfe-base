import { renderApp } from 'comm/src/utils'
import { ele } from 'plugins'
import 'plugins/styles'
// 应用配置
import App from '../App.vue'
import router from '../router'
import Vue from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
export default {
  render: renderApp,
  App,
  Vue,
  config: {
    router,
    el: '#app',
    plugins: [ele],
    init: (Vue) => {
      Vue.use(VXETable)
    }
  }
}

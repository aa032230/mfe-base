
import { renderApp } from '../../../base/src/utils/node_modules/comm/src/utils'
import { ele } from '../../../base/src/utils/node_modules/plugins'
import '../../../base/src/utils/node_modules/plugins/styles'
// 应用配置
import App from '../App.vue'
import router from '../router'
import Vue from '../../../base/src/utils/node_modules/vue'

export default {
    render: renderApp,
    App,
    Vue,
    config: {
        router,
        el: '#app',
        plugins: [ele],
        init: Vue => {
            // Vue.prototype.$echarts = echarts
        }
    }
}

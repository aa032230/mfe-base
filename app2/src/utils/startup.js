
import { renderApp } from 'comm/src/utils'
import { ele } from 'plugins'
import 'plugins/styles'
// 应用配置
import App from '../App.vue'
import router from '../router'
import Vue from 'vue'

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

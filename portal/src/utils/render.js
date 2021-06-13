import Vue from "vue"
import App from '../App.vue'
import router from '../router'
import { renderApp } from 'comm/src/utils'
import { ele } from 'plugins'
import 'plugins/styles'
Vue.config.productionTip = false

export default renderApp(Vue, App, {
    _install: { router },
    plugins: [ele],
    el: '#app',
    init: vm => {
        // vm.use of vm.prototype.xxx =xxx
    }
})

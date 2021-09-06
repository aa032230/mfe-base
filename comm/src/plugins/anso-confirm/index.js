import './index.scss'
import ansoConfirm from './confirm'
export default {
  install(Vue) {
    Vue.$ansoConfirm = null
    Vue.prototype.$ansoConfirm = function (options) {
      return new ansoConfirm(this, options)
    }
  }
}

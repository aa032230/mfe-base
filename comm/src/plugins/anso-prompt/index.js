import './index.scss'
import ansoPrompt from './prompt'

export default {
  install(Vue) {
    Vue.$ansoConfirm = null
    Vue.$ansoAlert = null
    Vue.prototype.$ansoConfirm = function (options) {
      return new ansoPrompt(this, options).initConfirm()
    }
    Vue.prototype.$ansoAlert = function (options) {
      return new ansoPrompt(this, options).initAlert()
    }
  }
}

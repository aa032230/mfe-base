import ansoConfirm from './confirm'
export default {
  install(Vue, options) {
    Vue.$ansoConfirm = null
    Vue.prototype.$ansoConfirm = function (options) {
      return new ansoConfirm(this, options)
    }
  }
}

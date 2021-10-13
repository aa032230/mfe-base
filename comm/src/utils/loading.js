import { Loading } from 'element-ui'
/**
 * @description: loading类
 * @param {*} context 当前vue实例
 * @return {*}
 */
export class ChangeLoading {
  constructor(context) {
    // 用于存储请求个数
    this.vm = context
    this.needLoadingRequestCount = 0
    this.el = 'body' // 挂载对象
    this.init()
  }
  /**
   * @description: 初始化
   * @param {*}
   * @return {*}
   */
  init() {
    const { showFullScreenLoading, hideFullScreenLoading, vm } = this
    vm.prototype.startLoading = showFullScreenLoading.bind(this)
    vm.prototype.closeLoading = hideFullScreenLoading.bind(this)
  }

  /**
   * @description:  开启
   * @param {*} el  loading挂载元素
   * @return {*}
   */
  static startLoading(el) {
    this.loading = Loading.service({
      lock: true,
      text: '努力加载中...',
      background: 'rgba(255,255,255,1)',
      target: document.querySelector(el) // 设置加载动画区域
    })
  }
  /**
   * @description:  关闭
   * @param {*}
   * @return {*}
   */
  static endLoading() {
    this.loading.close()
  }
  /**
   * @description: 开启loading
   * @param {*} el loading挂载元素
   * @return {*}
   */
  showFullScreenLoading(el) {
    el ? (this.el = el) : this.el
    if (this.needLoadingRequestCount === 0) {
      ChangeLoading.startLoading(this.el)
    }
    this.needLoadingRequestCount++
  }
  /**
   * @description: 关闭loading
   * @param {*}
   * @return {*}
   */
  hideFullScreenLoading() {
    if (this.needLoadingRequestCount <= 0) return
    this.needLoadingRequestCount--
    if (this.needLoadingRequestCount === 0) {
      ChangeLoading.endLoading()
    }
  }
}

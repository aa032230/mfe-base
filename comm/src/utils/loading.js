/**
 * @description: loading类
 * @param {*} context 当前vue实例
 * @return {*}
 */
export class ChangeLoading {
  constructor(context) {
    this.vm = context
    // 用于存储请求个数
    this.needLoadingRequestCount = 0
    // 挂载对象
    this.el = 'body'
    // 实例存在执行
    this.vm && this.init()
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
   * @description: 加载loading
   * @param {*} el loading挂载元素
   * @return {*}
   */
  showFullScreenLoading(el, options) {
    if (this.needLoadingRequestCount === 0) {
      ChangeLoading.startLoading.call(this, el, options)
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
      ChangeLoading.endLoading.call(this)
    }
  }
  /**
   * @description:  开启
   * @param {*} el  loading挂载元素
   * @return {*}
   */
  static startLoading(el, options) {
    const loading = this.vm.prototype.$loading
    this.el = el ? el : this.el
    
    let loadOption = {
      fullscreen: false,
      lock: true,
      text: '努力加载中...',
      target: this.el // 设置加载动画区域
    }
    loadOption = options ? (loadOption = options) : loadOption
    process.nextTick(() => {
      this.loading = loading(loadOption)
    })
  }
  /**
   * @description:  关闭
   * @param {*}
   * @return {*}
   */
  static endLoading() {
    process.nextTick(() => {
      this.loading.close()
    })
  }
}

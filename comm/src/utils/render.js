
/**
 * 
 * @param {*} el  挂载对象
 * @param {*} App  渲染对象
 * @param {*} options  Vue实例数据总线
 */
export const renderApp = (Vue, App, options) => {
    if (options.hasOwnProperty('plugins')) {
        if (Array.isArray(options.plugins)) {
            options.plugins.forEach(p => {
                p.components && p.components.forEach(c => {
                    Vue.use(c)
                })

                p.install(Vue)
            })
        }
    }
    if (options.hasOwnProperty('init')) {
        if (typeof options.init === 'function') {
            options.init(Vue)
        }
    }
    const install = new Vue({
        el: options.el,
        ...options._install,
        render: h => h(App)
    })
    return install
}

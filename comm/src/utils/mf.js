import actions from './actions'
if (isLoadInSubAppContainer()) {
    /* eslint no-undef: "off" */
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

export function isLoadInSubAppContainer() {
    return window.__POWERED_BY_QIANKUN__
}
export function wrapStartup(startup) {
    let { Render, App, Config, Vue } = startup

    let app = null

    return {
        async bootstrap() { },
        async mount(props) {
            if (!Config.plugins) Config.plugins = []
            window.__CONTEXT__ = {
                $bus: props.bus,
                $portal: props.portal,
                $data: props.data,
                $utils: Object.assign({}, props.utils)
            }
            Config.plugins.push({
                install: function (v, options) {
                    v.prototype.__CONTEXT__ = window.__CONTEXT__
                }
            })
            actions.setActions(props)
            app = Render(Vue, App, Config, props)
        },
        async unmount(props) {
            app && app.$destroy && app.$destroy()
            Config.router = null
            app = null
        },
        async update(props) { }
    }
}

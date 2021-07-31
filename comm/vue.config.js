
const { title, name } = require('./package')
module.exports = {
    configureWebpack: {
        name: title,
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'config': '@/config',
                'models': '@/models',
                'mixins': '@/mixins',
                'plugins': '@/plugins',
                'services': '@/services',
                'utils': '@/utils',
                'views': '@/views'
            }
        },
        output: {
            // 把子应用打包成 umd 库格式
            library: name,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`
        }
    },
    // 指定Runtime + Compile来编译组件
    runtimeCompiler: true,
    devServer: {
        port: 8082,
        headers: {
            'Access-Control-Allow-Origin': "*"
        }
    }
}

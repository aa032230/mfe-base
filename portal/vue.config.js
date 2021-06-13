
const { title } = require('./package')
module.exports = {
    publicPath: process.env.VUE_APP_PUBLICH_PATH,
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
                'views': '@/views',
            }
        }
    },
    // 指定Runtime + Compile来编译组件
    runtimeCompiler: true,
    devServer: {
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': "*"
        }
    }
}

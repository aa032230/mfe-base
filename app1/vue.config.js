const { title, name } = require('./package')
module.exports = {
  // publicPath: process.env.VUE_APP_PUBLICH_PATH,
  // outputDir: process.env.VUE_APP_BUILD_ENV === 'prd' ? './../dist/subapp/app1' : './dist',
  // productionSourceMap: process.env.VUE_APP_BUILD_ENV === 'prd' ? false : true,
  configureWebpack: {
    name: title,
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        config: '@/config',
        models: '@/models',
        mixins: '@/mixins',
        plugins: '@/plugins',
        services: '@/services',
        utils: '@/utils',
        views: '@/views',
        actions: '@/actions',
        reducers: '@/reducers',
        dispatchers: '@/dispatchers'
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: name,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  // 设置common要参与编译打包（ES6 -> ES5）
  transpileDependencies: ['comm'],
  // 指定Runtime + Compile来编译组件
  runtimeCompiler: true,
  devServer: {
    port: 9991,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

const { title } = require('./package')
// function returnDir(val) {
//   switch (val) {
//     case 'prd': return './../dist'; break;
//     case 'sgl': return './../singleBase'; break;
//     default: return './dist';
//   }
// }
// let dirString = returnDir(process.env.VUE_APP_BUILD_ENV)
module.exports = {
  // publicPath: process.env.VUE_APP_PUBLICH_PATH,
  // outputDir: dirString,
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
        views: '@/views'
      }
    }
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: '@import \'~comm/src/assets/css/base.scss\';'
      }
    }
  },
  // 设置common要参与编译打包（ES6 -> ES5）
  transpileDependencies: ['comm'],
  // 指定Runtime + Compile来编译组件
  runtimeCompiler: true,
  devServer: {
    port: 9990,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

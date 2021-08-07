module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier'],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 关闭检测函数名称和调用它的左括号之间的空格
    // 'func-call-spacing': 'off',
    // 缩进为2个空格
    indent: ['error', 2, { 'SwitchCase': 1 }],
    // 关闭检测未使用的变量
    'no-unused-vars': 'off',
    // 对象展开时总是要添加逗号，一行时行末不需要逗号
    'comma-dangle': ['error', 'never'],
    // 定义函数时，函数括号之前允许添加空格
    // 'space-before-function-paren': ['error', 'always'],
    // 关闭禁用无效标签
    'no-tabs': 'off',
    // 关闭空行检测
    'no-multiple-empty-lines': 'off',
    // 关闭模板字符串检测
    'no-template-curly-in-string': 'off',

    //强制使用单引号
    quotes: ['error', 'single'],
    // 禁止添加分号
    semi: ['error', 'never']
  }
}

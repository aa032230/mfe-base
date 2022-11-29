/**
 * 获取当前传入参数类型
 * @param {Any} param
 */
export function checkType(param) {
  let _t = void 0
  return ((_t = typeof param) == 'object' ? Object.prototype.toString.call(param).slice(8, -1) : _t).toLowerCase()
}

/**
 * 跨应用跳转
 * @param {String} url 当前页面的路由
 * @param {Object} data 传递数据
 * @param {String} title 当前页面的标题
 */
export function redirectApp(url) {
  const data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  const title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ''
  window.history.pushState(data, title, url)
}

/**
 * 修改路由base
 * @param {String} 微应用名称
 */
export function getBase(name) {
  const mfc = window.__MF_CONFIG__
  const base = mfc && mfc[name] ? mfc[name].activeBase : process.env.BASE_URL
  return base
}

/**
 * 路由文件导入
 * @param {String} file 文件名
 * @returns  导入的文件实例
 */
export function _import(file) {
  return require('@/views/' + file).default
}

/**
 * @description: 检查指定的key是否存在于对象中
 * @param {*} obj 对象
 * @param {*} key
 * @return {*}
 */
export function hasOwn(obj, key) {
  const hasOwnProperty = Object.prototype.hasOwnProperty
  return hasOwnProperty.call(obj, key)
}

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function toObject(arr) {
  var res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/**
 * @description 将扁平化数据 转换成 树状结构
 * @param {Array} list 扁平化的数据
 * @param {String} pid parentId的key名
 * @param {String} id id的key名
 * @param {String} child children的key名
 */
export function treeFormat({ list, pid = 'parentId', id = 'id', child = 'children' }) {
  const listOjb = {} // 用来储存{key: obj}格式的对象
  const treeList = [] // 用来储存最终树形结构数据的数组
  // 将数据变换成{key: obj}格式，方便下面处理数据
  for (let i = 0; i < list.length; i++) {
    listOjb[list[i][id]] = list[i]
  }
  // 根据pid来将数据进行格式化
  for (let j = 0; j < list.length; j++) {
    // 判断父级是否存在
    const haveParent = listOjb[list[j][pid]]
    if (haveParent) {
      // 如果有没有父级children字段，就创建一个children字段
      !haveParent[child] && (haveParent[child] = [])
      // 在父级里插入子项
      haveParent[child].push(list[j])
    } else {
      // 如果没有父级直接插入到最外层
      treeList.push(list[j])
    }
  }
  return treeList
}

/**
 * 文件导出
 * @param {*} file 文件流
 * @returns
 */
export function downloadFile(file) {
  const { headers, data } = file
  let blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  })
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  //获取文件名
  let fileName = headers['content-disposition'] ? decodeURI(headers['content-disposition'].split('=')[1]) : '' //处理文件名乱码问题
  downloadElement.download = fileName || Date.now() // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
  return
}

/**
 * 实现多维数组对象的扁平化
 * @param {Array} [obj], 期望转换的数组对象
 * @param {String} key, 关键字
 */
export function flatArr(obj, key) {
  let temp = obj[key]
  let result = [obj]
  if (temp && temp.constructor === Array) {
    // 1.将子级 push 到父级（造成二维数组 [obj, [children]]）
    // 2.递归子级的扁平化（清理子级中的第三维）
    result.push(temp.map((item) => flatArr([item], key)).flat())
  }
  // 清理输出内容中的二维
  return result.flat()
}

// 多维数组扁平化
export function flatten(arr) {
  var res = []
  arr.map((item) => {
    if (item.children && Array.isArray(item.children)) {
      res = res.concat(flatten(item.children))
    }
    res.push(item)
  })
  return res
}

import { validatenull } from './validate'
import { getSysDic } from '@/api/product/product'
import _ from 'lodash'
// 表单序列化
export const serialize = (data) => {
  const list = []
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
export const getObjType = (obj) => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 */
export const deepClone = (data) => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode'
  } else {
    document.body.className = document.body.className.replace(' grayMode', '')
  }
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

/**
 * 加密处理
 */
export const encryption = (params) => {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))

  key = CryptoJS.enc.Latin1.parse(key)

  if (type === 'Base64') {
    param.forEach((ele) => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach((ele) => {
      var data = result[ele]

      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
      result[ele] = encrypted.toString()
      console.info(encrypted.toString())
    })
  }
  return result
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }

  document.addEventListener('fullscreenchange', function () {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function () {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function () {
    listen()
  })
  document.addEventListener('msfullscreenchange', function () {
    listen()
  })
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen =
    document.fullscreenEnabled || window.fullScreen || document.mozFullscreenEnabled || document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    } else {
      if (menu[i].id === id) {
        return menu[i]
      }
    }
  }
}
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = (url) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) {
    /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
export const diffRouter = (obj1, obj2) => {
  delete obj1.close
  if (obj1.name == obj2.name) {
    return true
  }
  return false
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof value == 'string' || typeof value == 'number' || typeof value == 'boolean') {
    let index = 0
    index = findArray(dic, value)
    if (index != -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach((ele) => {
      index = findArray(dic, ele)
      if (index != -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i
    }
  }
  return -1
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

// 获取浏览器默认语言
export const getBrowserLang = function () {
  const browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  let defaultBrowserLang = ''
  if (
    browserLang.toLowerCase() === 'cn' ||
    browserLang.toLowerCase() === 'zh' ||
    browserLang.toLowerCase() === 'zh-cn'
  ) {
    defaultBrowserLang = 'zh-CN'
  } else {
    defaultBrowserLang = 'en-US'
  }
  return defaultBrowserLang
}

// 设置localStorage
export const setStorage = function (key, obj) {
  const json = JSON.stringify(obj)
  window.localStorage.setItem(key, json)
}

// 获取localStorage
export const getStorage = function (key) {
  const str = window.localStorage.getItem(key)
  if (!str) {
    return null
  }
  return JSON.parse(str)
}

// 移除localStorage
export const removeStorage = function (key) {
  window.localStorage.removeItem(key)
}

/**
 * 下载文件
 * @param {*} fileName
 * @param {*} blob
 */
export const downloadFile = (fileName, blob) => {
  // 非IE下载
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = window.URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    // 释放URL 对象
    window.URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
/**
 * @name  getTableData
 * @desc  纯JS前端分页方法
 * @param  {Number} page 当前页码，默认1
 * @param  {Number} pageSize 每页最多显示条数，默认10
 * @param  {Array} totalData 总的数据集，默认为空数组
 * @return {Object} {
     data, //当前页展示数据，数组
     page, //当前页码
     pageSize, //每页最多显示条数
     length, //总的数据条数
   }
 **/
export const getTableData = (page = 1, pageSize = 10, totalData = []) => {
  const { length } = totalData
  const tableData = {
    data: [],
    page,
    pageSize,
    length
  }
  if (pageSize >= length) {
    // pageSize大于等于总数据长度，说明只有1页数据或没有数据
    tableData.data = totalData
    tableData.page = 1 // 直接取第一页
  } else {
    // pageSize小于总数据长度，数据多余1页
    const num = pageSize * (page - 1) // 计算当前页（不含）之前的所有数据总条数
    if (num < length) {
      // 如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
      const startIndex = num // 当前页第一条数据在总数据集中的索引
      const endIndex = num + pageSize - 1 // 当前页最后一条数据索引
      tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex) // 当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
    } else {
      // 当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
      const size = parseInt(length / pageSize) // 取商
      const rest = length % pageSize // 取余数
      if (rest > 0) {
        // 余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
        tableData.page = size + 1 // 当前页码重置，取size+1
        tableData.data = totalData.filter((_, index) => index >= pageSize * size && index <= length)
      } else if (rest === 0) {
        // 余数等于0，最后一页数据条数正好是pageSize
        tableData.page = size // 当前页码重置，取size
        tableData.data = totalData.filter((_, index) => index >= pageSize * (size - 1) && index <= length)
      } // 注：余数不可能小于0
    }
  }
  console.log(tableData, 'tableData')
  return tableData
}

/**
 * 处理导出excel文件
 */
export const handleExportData = (resData, vm, excelName, msg = '导出成功', type = 'success') => {
  const blob = new Blob([resData.data])
  let fileName = resData.headers['content-disposition'].split('=')[1]
  fileName = excelName || decodeURI(fileName)
  const linkNode = document.createElement('a')
  linkNode.download = fileName // a标签的download属性规定下载文件的名称
  linkNode.style.display = 'none'
  linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
  document.body.appendChild(linkNode)
  linkNode.click() // 模拟在按钮上的一次鼠标单击
  URL.revokeObjectURL(linkNode.href) // 释放URL 对象
  vm.$message({
    message: msg,
    type
  })
}
// 下载模板
export const handleDownloadByUrl = (url) => {
  const name = url.split(url.indexOf('/'))[1]
  const fileName = name?.split('.')[0]
  const eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.style.display = 'none'
  eleLink.href = url
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
  URL.revokeObjectURL(eleLink.href)
}
/**
 * 复制文本
 */
export const copyText = (value, vm) => {
  if (!value) return
  const oInput = document.createElement('input')
  oInput.value = value
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  vm.$message({
    message: `已成功复制--${value}`,
    type: 'success'
  })
  oInput.remove()
}

// 获取体系数据源
export const getSysDic66 = () => {
  return new Promise((resolve, reject) => {
    getSysDic(66)
      .then(({ data: resData }) => {
        if (resData.code === 200) {
          resolve(resData.data)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 获取文件类型
 * @param  {String} name 文件名称
 */

export const getFileType = (name) => {
  const index1 = name.lastIndexOf('.')
  const index2 = name.length
  return name.substring(index1, index2)
}
/**
 * encode文件地址后的文件名称
 * @param  {String} url 文件oss地址
 */
export const encodeFileNameByUrl = (url) => {
  const index = url.lastIndexOf('/')
  const ossUrl = url.substring(0, index + 1)
  const fileName = url.substring(index + 1, url.length)
  const fileUrl = ossUrl + encodeURIComponent(fileName)
  return fileUrl
}

// 处理合并数据
export const handleMergeData = (valueKey, data) => {
  let pos = 0
  const spanArr = []
  data.forEach((item, i) => {
    if (i === 0) {
      spanArr.push(1)
      pos = 0
    } else {
      // 判断当前元素与上一个元素是否相同,因合并第一个所以[0]
      if (data[i][valueKey] === data[i - 1][valueKey]) {
        spanArr[pos] += 1
        spanArr.push(0)
      } else {
        spanArr.push(1)
        pos = i
      }
    }
  })
  return spanArr
}

export const getTableMaxHeightByInnerHeight = () => {
  return window.innerHeight > 900 ? 650 : 500
}

export const formatInt = (v) => v.replace(/[^\d]+/g, '').replace(/^0{1,}/g, '')
// 保存两位正整数
export const formatTwoLittleNumber = (v) =>
  v
    .replace(/[^\d.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
// 保存两位正整数
export const formatLittleNumber = (v, float) => {
  let value = v
    .replace(/[^\d.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/^\./g, '0.')
  const str = '^(\\d+)\\.(\\d{' + float + '}).*$'
  const reg = new RegExp(str)
  value = value.replace(reg, '$1.$2')
  return value
}
export const formatFloatNumber = (v) =>
  v
    .replace(/[^\d.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/^\./g, '')
/**
 * 限制输入整数，浮点数
 * @param {*} el 指令所绑定的元素
 * @param {*} binding 指令对象
 * @param {*} vnode vue DIFF 生成的虚拟节点
 */
export function onInput(ele, binding, vnode) {
  function handle() {
    let val = ele.value
    const t = val.charAt(0)
    // modifiers为修饰符对象，传入了float，则其float属性为true
    if (binding.modifiers.float) {
      // 清除"数字"和"."以外的字符
      val = val.replace(/[^\d.]/g, '')
      // 只保留第一个, 清除多余的
      val = val.replace(/\.{2,}/g, '.')
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      val = val.replace(/^(\-)*(\d+)\.(\d+).*$/, '$1$2.$3')
      // 第一个字符如果是.号，则补充前缀0
      val = val.replace(/^\./g, '0.')
      if (typeof binding.value !== 'undefined') {
        // 期望保留的最大小数位数
        let pointKeep = 0
        if (typeof binding.value === 'string' || typeof binding.value === 'number') {
          pointKeep = parseInt(binding.value)
        }
        if (!isNaN(pointKeep)) {
          if (!Number.isInteger(pointKeep) || pointKeep < 0) {
            pointKeep = 0
          }
          const str = '^(\\d+)\\.(\\d{' + pointKeep + '}).*$'
          const reg = new RegExp(str)
          if (pointKeep === 0) {
            // 不需要小数点
            val = val.replace(reg, '$1')
          } else {
            // 通过正则保留小数点后指定的位数
            val = val.replace(reg, '$1.$2')
          }
        }
      } else {
        val = val.replace(/[^\d]/g, '')
      }
    } else {
      val = val.replace(/[^\d]/g, '')
    }
    if (t === '-') {
      val = '-' + val
    }
    ele.value = val

    // 手动触发数据的双向绑定,解决表单验证问题
    if (vnode.componentInstance) {
      vnode.componentInstance.$emit('input', ele.value)
    } else {
      vnode.elm.dispatchEvent(new CustomEvent('input', ele.value))
    }
  }

  return handle
}

export const getUrlAllParams = (url) => {
  const decodeUrl = decodeURI(url)
  const data = {}
  const url_data = _.split(decodeUrl, '?').length > 1 ? _.split(decodeUrl, '?')[1] : null
  if (!url_data) return null
  const params_arr = _.split(url_data, '&')
  _.forEach(params_arr, (item) => {
    const key = _.split(item, '=')[0]
    const value = _.split(item, '=')[1]
    data[key] = value
  })
  return data
}

/**
 * @description:  限制只能输入整数 | 小数
 * @param {*} e 事件对象
 * @param {*} type 数字类型
 * @return {*}
 */
export function changeInput(e, type) {
  let val = e.target.value
  const t = val.charAt(0)
  if (type === 'int') {
    // 限制只能输入数字
    val = val.replace(/[^\d+]/g, '')
  } else {
    // 替换非数字，除了数字和.
    val = val.replace(/[^\d.]/g, '')
    // 保证只有出现一个.
    val = val.replace(/\.{2,}/g, '.')
    // 第一个数字是.补0
    val = val.replace(/^\./g, '0.')
    // 保证.只出现一次
    val = val.replace(/(\.)(\d*)(\1*)/g, '$1$2')
  }
  // 负数处理
  if (t === '-') {
    e.target.value = '-' + val
  } else {
    e.target.value = val
  }
}

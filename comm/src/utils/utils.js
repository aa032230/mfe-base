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
  console.log(result)
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

/**
 * 限制输入整数，浮点数
 * @param {*} el 指令所绑定的元素
 * @param {*} binding 指令对象
 * @param {*} vnode vue DIFF 生成的虚拟节点
 */
export function onInput(el, binding, vnode) {
  function handle() {
    // 手动触发数据的双向绑定,解决表单验证问题
    if (vnode.componentInstance) {
      vnode.componentInstance.$emit('input', el.value)
    } else {
      vnode.elm.dispatchEvent(new CustomEvent('input', el.value))
    }
    let val = el.value
    const t = val.charAt(0)
    // modifiers为修饰符对象，传入了float，则其float属性为true v-input-number.float="2"
    if (binding.modifiers.float) {
      // 清除"数字"和"."以外的字符
      val = val.replace(/^[-]{0,1}\d.|[^\d.]/g, '')
      // 只保留第一个, 清除多余的
      val = val.replace(/\.{2,}/g, '.')
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
    // 负数处理
    if (t === '-') {
      el.value = '-' + val
    } else {
      el.value = val
    }
  }
  return handle
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
    // 先把非数字的都替换掉，除了数字和.
    val = val.replace(/[^\d.]/g, '')
    // 保证只有出现一个.而没有多个.
    val = val.replace(/\.{2,}/g, '.')
    // 必须保证第一个为数字而不是.
    val = val.replace(/^\./g, '')
    // 保证.只出现一次，而不能出现两次以上
    val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  }
  // 负数处理
  if (t === '-') {
    e.target.value = '-' + val
  } else {
    e.target.value = val
  }
}

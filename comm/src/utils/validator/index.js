import validates from './strategies'
/**
 * 生成表格自定义校验函数
 * @param {*} key  校验策略
 * @param {*} msg  错误信息
 * @returns
 */
export const formValidateGene = (strategys) => (rule, value, cb) => {
  strategys.forEach((item) => {
    if (validates[item.strategy](value)) {
      cb()
    } else {
      cb(new Error(item.msg))
    }
  })
}

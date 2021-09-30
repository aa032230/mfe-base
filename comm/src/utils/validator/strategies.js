/*-------------*
 |   校验策略  |
 *-------------*/
export default {
  /**
   * @description: 大写字母
   * @param {*} value 待校验的字符串
   * @return {*}
   */
  UpperCase(value) {
    const regex = /^[A-Z]+$/
    return valid(value, regex)
  },
  /**
   * @description: url
   * @param {*}
   * @return {*}
   */
  URL(value) {
    const regex =
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?"\\+&%$#=~_-]+))*$/
    return valid(value, regex)
  },
  /**
   * @description: 小写字母
   * @param {*} str
   * @return {*}
   */
  LowerCase(str) {
    const regex = /^[a-z]+$/
    return valid(str, regex)
  },
  /**
   * @description: 只能输入数字
   * @param {*} num
   * @return {*}
   */
  Number(num) {
    const regex = /^\d+$/
    return valid(num, regex)
  },
  /**
   * @description: 只能输入正整数
   * @param {*} num
   * @return {*}
   */
  IntPlus(num) {
    const regex = /^[1-9]\d*$/
    return valid(num, regex)
  },
  /**
   * @description: 只能输入数字，最多一位小数
   * @param {*} num
   * @return {*}
   */
  Float1(num) {
    const regex = /^-?\d+(\.\d)?$/
    return valid(num, regex)
  },
  /**
   * @description: 只能输入数字，最多两位小数
   * @param {*} num
   * @return {*}
   */
  Float2(num) {
    const regex = /^-?\d+(\.\d{1,2})?$/
    return valid(num, regex)
  },
  /**
   * @description: 只能输入数字，最多三位小数
   * @param {*} num
   * @return {*}
   */
  Float3(num) {
    const regex = /^-?\d+(\.\d{1,3})?$/
    return valid(num, regex)
  },
  /**
   * @description: 只能输入数字，最多三位小数
   * @param {*} num
   * @return {*}
   */
  FloatPlus3(num) {
    const regex = /^\d+(\.\d{1,3})?$/
    return valid(num, regex)
  },
  /**
   * @description: 只能使用字母、数字、下划线、中划线
   * @param {*} code
   * @return {*}
   */
  Encode(code) {
    const regex = /^(_|-|[a-zA-Z0-9])+$/
    return valid(code, regex)
  },
  /**
   * @description: 只能使用字母、数字
   * @param {*} code
   * @return {*}
   */
  Encode2(code) {
    const regex = /^[a-zA-Z0-9]+$/
    return valid(code, regex)
  },
  /**
   * @description: 只能使用字母、数字、下划线
   * @param {*} code
   * @return {*}
   */
  Encode3(code) {
    const regex = /^(_|[a-zA-Z0-9])+$/
    return valid(code, regex, '')
  },
  /**
   * @description: 只能使用中文、英文
   * @param {*} code
   * @return {*}
   */
  CNandEN(code) {
    const regex = /^[a-zA-Z\u4e00-\u9fa5]+$/
    return valid(code, regex)
  },
  /**
   * @description: 手机或电话
   * @param {*} val
   * @return {*}
   */
  MobileOrPhone(val) {
    const result = /^1\d{10}$/.test(val) || /^(0\d{2,3})?-?\d{7,8}$/.test(val)
    return result
  }
}

/**
 * @description: 参数校验
 * @param {*} value 待校验的字符串
 * @param {*} regex 正则
 * @return {*}
 */
function valid(value, regex) {
  return regex.test(value)
}

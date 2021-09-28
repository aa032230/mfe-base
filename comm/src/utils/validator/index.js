//校验规则列表（可扩展）
const rules = {
  // url
  URL(url) {
    const regex =
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?"\\+&%$#=~_-]+))*$/
    return valid(url, regex, 'URL格式不正确')
  },
  // 小写字母
  LowerCase(str) {
    const regex = /^[a-z]+$/
    return valid(str, regex, '只能输入小写字母')
  },
  // 大写字母
  UpperCase(str) {
    const regex = /^[A-Z]+$/
    return valid(str, regex, '只能输入大写字母')
  },
  // 英文
  Alphabets(str) {
    const regex = /^[A-Za-z]+$/
    return valid(str, regex, '只能输入字母')
  },
 // email
  Email(email) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return valid(email, regex, '邮箱地址格式不正确')
  },
  //手机
  Mobile(mobile) {
    const regex = /^1\d{10}$/
    return valid(mobile, regex, '手机号格式不正确')
  },
 // 电话
  Phone(phone) {
    const regex = /^(0\d{2,3})?-?\d{7,8}$/
    return valid(phone, regex, '电话号码格式不正确')
  },
  // 邮编
  Postcode(postcode) {
    const regex = /^[0-9][0-9]{5}$/
    return valid(postcode, regex, '邮编格式不正确')
  },
  // 数字
  Number(num) {
    const regex = /^\d+$/
    return valid(num, regex, '只能输入纯数字')
  },
 // 传真
  Fax(fax) {
    const regex = /^(\d{3,4}-)?\d{7,8}$/
    return valid(fax, regex, '传真格式不正确')
  },
  // 非负整数
  Int(num) {
    const regex = /^((0)|([1-9]\d*))$/
    return valid(num, regex, '只能输入非负整数')
  },
  // 正整数
  IntPlus(num) {
    const regex = /^[1-9]\d*$/
    return valid(num, regex, '只能输入正整数')
  },

  Float1(num) {
    const regex = /^-?\d+(\.\d)?$/
    return valid(num, regex, '只能输入数字，最多一位小数')
  },

  Float2(num) {
    const regex = /^-?\d+(\.\d{1,2})?$/
    return valid(num, regex, '只能输入数字，最多两位小数')
  },

  Float3(num) {
    const regex = /^-?\d+(\.\d{1,3})?$/
    return valid(num, regex, '只能输入数字，最多三位小数')
  },

  FloatPlus3(num) {
    const regex = /^\d+(\.\d{1,3})?$/
    return valid(num, regex, '只能输入数字，最多三位小数')
  },

  Encode(code) {
    const regex = /^(_|-|[a-zA-Z0-9])+$/
    return valid(code, regex, '编码只能使用字母、数字、下划线、中划线')
  },

  Encode2(code) {
    const regex = /^[a-zA-Z0-9]+$/
    return valid(code, regex, '编码只能使用字母、数字')
  },

  Encode3(code) {
    const regex = /^(_|[a-zA-Z0-9])+$/
    return valid(code, regex, '编码只能使用字母、数字、下划线')
  },

  IdCard(code) {
    const regex = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return valid(code, regex, '请输入正确的身份证号码')
  },

  USCC(code) {
    const regex = /^[0-9A-Z]{18}/
    return valid(code, regex, '请输入正确的社会信用号')
  },

  CarNum(code) {
    const regex =
      /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/i
    return valid(code, regex, '请输入正确的车牌号')
  },

  CNandEN(code) {
    const regex = /^[a-zA-Z\u4e00-\u9fa5]+$/
    return valid(code, regex, '只能使用中文、英文')
  },

  MobileOrPhone(val) {
    const result = /^1\d{10}$/.test(val) || /^(0\d{2,3})?-?\d{7,8}$/.test(val)
    return valid(result, null, '手机或电话号格式不正确')
  }
}

//val:String 要校验的值
//regex:RegExp 校验正则,不是正则时val作为result的值
//msg:String 校验不通过的错误信息
function valid(val, regex, msg) {
  return { result: regex instanceof RegExp ? regex.test(val) : !!val, errMsg: msg }
}

//required:Boolean 是否必填项，选填，默认"true"
//type:String/Function 校验类型，选填，
//     String时必须是上面rules中存在的函数名，
//     Function时只接收一个参数(输入值)，返回格式： {result:Boolean, errMsg:String}
//trigger:String 触发动作，选填，默认"blur"
//nullMsg:String 未输入的提示语，选填，required=true时有效
export function ansoRule(required = true, type, trigger = 'blur', nullMsg = '该字段为必填项') {
  const rule = { required: !!required, trigger }

  let check = null
  if (typeof type === 'function') {
    check = type
  } else {
    check = type ? rules[type + ''] : null
  }

  if (check) {
    //存在规则时添加规则
    rule.validator = (r, v, c) => {
      const { result, errMsg } = check(v)
      if (required) {
        //必填项: null,undefined,"","  " 都算无输入内容
        return v == null || (v + '').trim() === '' ? c(new Error(nullMsg)) : result ? c() : c(new Error(errMsg))
      }
      //选填项: null,undefined,"" 都算无输入内容，"  "会被校验
      return v == null || v + '' === '' || result ? c() : c(new Error(errMsg))
    }
  } else {
    rule.message = nullMsg
  }

  return [rule]
}
